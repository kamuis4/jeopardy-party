// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — Server
//  Express + Socket.io + MongoDB Atlas
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const cors       = require('cors');
const { v4: uuidv4 } = require('uuid');

const { connectDB }  = require('./db');
const Pack           = require('./models/Pack');
const FALLBACK_PACKS = require('./packs');
const GameManager    = require('./gameManager');

const app    = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || '*';

const io = new Server(server, {
  cors: { origin: FRONTEND_URL, methods: ['GET', 'POST'] },
  pingTimeout: 60000,
  pingInterval: 25000,
});

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const gm = new GameManager();

// ── Chargement des packs ────────────────────────────────────
async function loadPacksIntoCache() {
  try {
    const packs = await Pack.find({}).lean();
    if (packs.length > 0) {
      gm.setPacksCache(packs);
      return packs.length;
    }
    console.warn('[Packs] DB vide — fallback sur packs.js');
    gm.setPacksCache(FALLBACK_PACKS);
    return 0;
  } catch {
    console.warn('[Packs] Erreur lecture DB — fallback sur packs.js');
    gm.setPacksCache(FALLBACK_PACKS);
    return 0;
  }
}

// ── REST ────────────────────────────────────────────────────
app.get('/', (_, res) => res.json({ status: 'ok', game: 'Jeopardy Party 🎮' }));
app.get('/api/packs', (_, res) => res.json(gm.getAvailablePacks()));

// Recharge les packs depuis MongoDB sans redémarrer (utile après ajout dans Atlas)
app.get('/api/packs/reload', async (_, res) => {
  const count = await loadPacksIntoCache();
  res.json({ success: true, source: count > 0 ? 'mongodb' : 'fallback', count: gm.packsCache.length });
});

// ── Socket.io ──────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[CONNECT] ${socket.id}`);
  const toRoom = (roomCode, event, data) => io.to(roomCode).emit(event, data);

  socket.on('create_room', ({ playerUUID, playerName }, cb) => {
    try {
      const uuid = playerUUID || uuidv4();
      const { roomCode, room } = gm.createRoom(uuid, playerName, socket.id);
      if (!room.selectedPackId && gm.packsCache.length > 0) {
        room.selectedPackId = gm.packsCache[0].id;
        gm.rooms[roomCode].selectedPackId = gm.packsCache[0].id;
      }
      socket.join(roomCode);
      cb?.({ success: true, uuid, roomCode, room });
      console.log(`[ROOM CREATE] ${roomCode} by "${playerName}"`);
    } catch (e) { cb?.({ success: false, error: e.message }); }
  });

  socket.on('join_room', ({ playerUUID, playerName, roomCode }, cb) => {
    try {
      const uuid   = playerUUID || uuidv4();
      const code   = roomCode.toUpperCase().trim();
      const result = gm.joinRoom(uuid, playerName, code, socket.id);
      if (!result.success) { cb?.({ success: false, error: result.error }); return; }
      socket.join(code);
      cb?.({ success: true, uuid, room: result.room });
      toRoom(code, 'room_update', result.room);
      console.log(`[ROOM JOIN] ${code} by "${playerName}"`);
    } catch (e) { cb?.({ success: false, error: e.message }); }
  });

  socket.on('rejoin', ({ playerUUID, roomCode }, cb) => {
    try {
      const result = gm.rejoinRoom(playerUUID, roomCode, socket.id);
      if (!result.success) { cb?.({ success: false, error: result.error }); return; }
      socket.join(roomCode);
      cb?.({ success: true, room: result.room });
      toRoom(roomCode, 'room_update', result.room);
    } catch (e) { cb?.({ success: false, error: e.message }); }
  });

  socket.on('select_pack', ({ roomCode, packId, playerUUID }) => {
    const r = gm.selectPack(roomCode, packId, playerUUID);
    if (r.success) toRoom(roomCode, 'room_update', r.room);
  });

  socket.on('toggle_teams', ({ roomCode, enabled, playerUUID }) => {
    const r = gm.toggleTeams(roomCode, enabled, playerUUID);
    if (r.success) toRoom(roomCode, 'room_update', r.room);
  });

  socket.on('join_team', ({ roomCode, teamId, playerUUID }) => {
    const r = gm.joinTeam(roomCode, teamId, playerUUID);
    if (r.success) toRoom(roomCode, 'room_update', r.room);
  });

  socket.on('start_game', ({ roomCode, playerUUID }, cb) => {
    const r = gm.startGame(roomCode, playerUUID);
    if (!r.success) { cb?.({ success: false, error: r.error }); return; }
    cb?.({ success: true });
    toRoom(roomCode, 'game_started', r.gameState);
    console.log(`[GAME START] ${roomCode}`);
  });

  socket.on('select_question', ({ roomCode, questionKey, playerUUID }) => {
    const r = gm.selectQuestion(roomCode, questionKey, playerUUID);
    if (!r.success) { socket.emit('error_msg', r.error || 'Action impossible.'); return; }
    toRoom(roomCode, 'question_opened', r.question);
    toRoom(roomCode, 'game_state_update', r.gameState);
  });

  socket.on('reveal_answer', ({ roomCode, playerUUID }) => {
    const r = gm.revealAnswer(roomCode, playerUUID);
    if (!r.success) { socket.emit('error_msg', r.error || 'Action impossible.'); return; }
    socket.emit('answer_revealed', { answer: r.answer, timerEnd: r.timerEnd, graceEnd: r.graceEnd, isAsker: true });
    socket.to(roomCode).emit('answer_revealed', { answer: null, timerEnd: r.timerEnd, graceEnd: r.graceEnd, isAsker: false });
    toRoom(roomCode, 'game_state_update', r.gameState);
    const key = r.questionKey;
    if (gm.timers[roomCode]) clearTimeout(gm.timers[roomCode]);
    gm.timers[roomCode] = setTimeout(() => {
      const cr = gm.autoCloseQuestion(roomCode, key);
      if (cr?.closed) {
        toRoom(roomCode, 'question_timeout', { nextPlayer: cr.nextPlayer, answer: cr.answer });
        toRoom(roomCode, 'game_state_update', cr.gameState);
      }
    }, 15500);
  });

  socket.on('claim_wrong', ({ roomCode, playerUUID }) => {
    const r = gm.claimWrong(roomCode, playerUUID);
    if (!r.success) return;
    toRoom(roomCode, 'grace_ended', {});
    toRoom(roomCode, 'game_state_update', r.gameState);
  });

  socket.on('claim_correct', ({ roomCode, playerUUID }) => {
    const r = gm.claimCorrect(roomCode, playerUUID);
    if (!r.success) { socket.emit('error_msg', 'Action impossible.'); return; }
    toRoom(roomCode, 'points_awarded', { player: r.player, points: r.points, newScore: r.newScore });
    toRoom(roomCode, 'question_closed', { nextPlayer: r.nextPlayer, reason: 'correct', answer: r.answer });
    toRoom(roomCode, 'game_state_update', r.gameState);
  });

  socket.on('buzz_steal', ({ roomCode, playerUUID }) => {
    const r = gm.buzzSteal(roomCode, playerUUID);
    if (!r.success) { socket.emit('error_msg', r.error || 'Buzz impossible.'); return; }
    toRoom(roomCode, 'steal_attempt', { stealer: r.stealer, victim: r.victim });
    toRoom(roomCode, 'game_state_update', r.gameState);
  });

  socket.on('steal_correct', ({ roomCode, playerUUID }) => {
    const r = gm.stealCorrect(roomCode, playerUUID);
    if (!r.success) { socket.emit('error_msg', 'Action impossible.'); return; }
    toRoom(roomCode, 'points_awarded', { player: r.player, points: r.points, newScore: r.newScore });
    toRoom(roomCode, 'question_closed', { nextPlayer: r.nextPlayer, reason: 'steal_correct', answer: r.answer });
    toRoom(roomCode, 'game_state_update', r.gameState);
  });

  socket.on('steal_wrong', ({ roomCode, playerUUID }) => {
    const r = gm.stealWrong(roomCode, playerUUID);
    if (!r.success) { socket.emit('error_msg', 'Action impossible.'); return; }
    toRoom(roomCode, 'life_lost', { player: r.player, livesLeft: r.livesLeft });
    toRoom(roomCode, 'game_state_update', r.gameState);
    if (r.gameOver) toRoom(roomCode, 'question_timeout', { nextPlayer: r.nextPlayer, answer: r.answer });
  });

  socket.on('play_audio', ({ roomCode, audioUrl, timestamp }) => {
    socket.to(roomCode).emit('sync_audio', { audioUrl, timestamp: timestamp || Date.now() });
  });

  // ── LEAVE ROOM (volontaire) ───────────────────────────────
  socket.on('leave_room', ({ roomCode, playerUUID }) => {
    const room = gm.rooms[roomCode];
    if (!room || !room.players[playerUUID]) return;
    room.players[playerUUID].connected = false;
    socket.leave(roomCode);
    toRoom(roomCode, 'room_update', gm.sanitizeRoom(room));
    console.log(`[LEAVE] ${playerUUID} a quitté ${roomCode}`);
  });

  socket.on('disconnect', () => {
    const result = gm.handleDisconnect(socket.id);
    if (result?.roomCode) toRoom(result.roomCode, 'room_update', result.room);
    console.log(`[DISCONNECT] ${socket.id}`);
  });
});

// ── Boot ───────────────────────────────────────────────────
async function boot() {
  const dbOk = await connectDB();
  if (dbOk) {
    await loadPacksIntoCache();
  } else {
    gm.setPacksCache(FALLBACK_PACKS);
  }

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`\n🎮 Jeopardy Party — http://localhost:${PORT}`);
    console.log(`   DB       : ${dbOk ? 'MongoDB Atlas ✅' : 'Fallback local ⚠️'}`);
    console.log(`   Packs    : ${gm.packsCache.length} chargé(s)`);
    console.log(`   Frontend : ${FRONTEND_URL}\n`);
  });
}

boot();
