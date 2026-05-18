// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — GameManager
//  Manages all in-memory game state for all active rooms
// ─────────────────────────────────────────────────────────────

const { v4: uuidv4 } = require('uuid');

const MAX_LIVES = 3;
const STEAL_TIMER_MS = 15000;
const GRACE_PERIOD_MS = 5000; // délai avant que le buzz s'ouvre

class GameManager {
  constructor() {
    this.rooms      = {};   // roomCode -> Room
    this.socketMap  = {};   // socketId -> { playerUUID, roomCode }
    this.timers     = {};   // roomCode -> timeoutHandle
    this.packsCache = [];   // chargé depuis MongoDB (ou packs.js en fallback)
  }

  // Appelé depuis server.js après connexion DB (ou au démarrage en fallback)
  setPacksCache(packs) {
    this.packsCache = packs;
    console.log(`[GameManager] ${packs.length} pack(s) chargé(s) en cache`);
  }

  sanitizeRoom(room) { return this._sanitizeRoom(room); }

  // ── Helpers ──────────────────────────────────────────────

  _generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code;
    do {
      code = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    } while (this.rooms[code]);
    return code;
  }

  _sanitizeRoom(room) {
    // Return a clean serializable snapshot
    return JSON.parse(JSON.stringify(room));
  }

  _getPlayerOrTeamId(room, playerUUID) {
    if (room.teamsEnabled) {
      const player = room.players[playerUUID];
      return player ? player.teamId : null;
    }
    return playerUUID;
  }

  _isCurrentTurn(room, playerUUID) {
    const controlId = this._getPlayerOrTeamId(room, playerUUID);
    return room.currentTurn === controlId || room.currentTurn === playerUUID;
  }

  _getNextRandomPlayer(room, excludeUUID = null) {
    const eligiblePlayers = Object.values(room.players).filter(
      p => p.connected && p.uuid !== excludeUUID && p.lives > 0
    );
    if (eligiblePlayers.length === 0) return null;
    return eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)].uuid;
  }

  _clearTimer(roomCode) {
    if (this.timers[roomCode]) {
      clearTimeout(this.timers[roomCode]);
      delete this.timers[roomCode];
    }
  }

  // ── Room Management ───────────────────────────────────────

  createRoom(playerUUID, playerName, socketId) {
    const roomCode = this._generateRoomCode();
    const player = {
      uuid: playerUUID,
      name: playerName,
      score: 0,
      lives: MAX_LIVES,
      teamId: null,
      connected: true,
      isCreator: true,
    };

    this.rooms[roomCode] = {
      code: roomCode,
      status: 'lobby',         // lobby | starting | playing | finished
      creatorUUID: playerUUID,
      players: { [playerUUID]: player },
      teams: {},
      teamsEnabled: false,
      selectedPackId: null, // sera défini dès que le lobby charge les packs
      currentTurn: null,
      activeQuestion: null,
      grid: {},
      revealedAnswer: null,
    };

    this.socketMap[socketId] = { playerUUID, roomCode };

    return { roomCode, room: this._sanitizeRoom(this.rooms[roomCode]) };
  }

  joinRoom(playerUUID, playerName, roomCode, socketId) {
    const room = this.rooms[roomCode];
    if (!room) return { success: false, error: 'Salon introuvable.' };
    if (room.status === 'playing') {
      // Allow spectate/rejoin only if UUID already known
      if (!room.players[playerUUID]) {
        return { success: false, error: 'La partie est déjà en cours.' };
      }
    }

    if (!room.players[playerUUID]) {
      room.players[playerUUID] = {
        uuid: playerUUID,
        name: playerName,
        score: 0,
        lives: MAX_LIVES,
        teamId: null,
        connected: true,
        isCreator: false,
      };
    } else {
      room.players[playerUUID].connected = true;
      room.players[playerUUID].name = playerName;
    }

    this.socketMap[socketId] = { playerUUID, roomCode };

    return { success: true, room: this._sanitizeRoom(room) };
  }

  rejoinRoom(playerUUID, roomCode, socketId) {
    const room = this.rooms[roomCode];
    if (!room) return { success: false, error: 'Salon introuvable.' };
    if (!room.players[playerUUID]) return { success: false, error: 'Joueur inconnu dans ce salon.' };

    room.players[playerUUID].connected = true;
    this.socketMap[socketId] = { playerUUID, roomCode };

    return { success: true, room: this._sanitizeRoom(room) };
  }

  handleDisconnect(socketId) {
    const info = this.socketMap[socketId];
    if (!info) return null;
    delete this.socketMap[socketId];

    const { playerUUID, roomCode } = info;
    const room = this.rooms[roomCode];
    if (!room || !room.players[playerUUID]) return null;

    room.players[playerUUID].connected = false;
    return { roomCode, room: this._sanitizeRoom(room) };
  }

  // ── Lobby Config ──────────────────────────────────────────

  selectPack(roomCode, packId, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || room.creatorUUID !== playerUUID) return { success: false };
    if (!this.packsCache.find(p => p.id === packId)) return { success: false, error: 'Pack introuvable.' };

    room.selectedPackId = packId;
    return { success: true, room: this._sanitizeRoom(room) };
  }

  toggleTeams(roomCode, enabled, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || room.creatorUUID !== playerUUID) return { success: false };

    room.teamsEnabled = enabled;
    if (enabled && Object.keys(room.teams).length === 0) {
      room.teams = {
        team1: { id: 'team1', name: 'Équipe Cyan', members: [], score: 0, lives: MAX_LIVES },
        team2: { id: 'team2', name: 'Équipe Violet', members: [], score: 0, lives: MAX_LIVES },
      };
    }
    if (!enabled) {
      Object.values(room.players).forEach(p => (p.teamId = null));
    }
    return { success: true, room: this._sanitizeRoom(room) };
  }

  joinTeam(roomCode, teamId, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.teams[teamId]) return { success: false };

    // Remove from old team
    const player = room.players[playerUUID];
    if (!player) return { success: false };
    if (player.teamId && room.teams[player.teamId]) {
      room.teams[player.teamId].members = room.teams[player.teamId].members.filter(id => id !== playerUUID);
    }

    player.teamId = teamId;
    if (!room.teams[teamId].members.includes(playerUUID)) {
      room.teams[teamId].members.push(playerUUID);
    }

    return { success: true, room: this._sanitizeRoom(room) };
  }

  // ── Game Start ────────────────────────────────────────────

  startGame(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room) return { success: false, error: 'Salon introuvable.' };
    if (room.creatorUUID !== playerUUID) return { success: false, error: 'Seul le créateur peut lancer la partie.' };
    if (Object.keys(room.players).length < 2) return { success: false, error: 'Il faut au moins 2 joueurs.' };

    const pack = this.packsCache.find(p => p.id === room.selectedPackId);
    if (!pack) return { success: false, error: 'Pack introuvable.' };

    // Build grid
    const grid = {};
    pack.categories.forEach(cat => {
      cat.questions.forEach(q => {
        const key = `${cat.name}__${q.level}`;
        grid[key] = {
          key,
          category: cat.name,
          level: q.level,
          points: q.points,
          question: q.question,
          answer: q.answer,
          type: q.type,
          mediaUrl: q.mediaUrl,
          completed: false,
          locked: false,
        };
      });
    });

    room.grid = grid;
    room.status = 'starting';
    room.categories = pack.categories.map(c => c.name);
    room.levels = [1, 2, 3, 4, 5];

    // Reset scores & lives
    Object.values(room.players).forEach(p => {
      p.score = 0;
      p.lives = MAX_LIVES;
    });
    Object.values(room.teams).forEach(t => {
      t.score = 0;
      t.lives = MAX_LIVES;
    });

    // Pick random first player
    const playerIds = Object.keys(room.players);
    room.currentTurn = playerIds[Math.floor(Math.random() * playerIds.length)];
    room.activeQuestion = null;

    const gameState = this._buildGameState(room);

    // Switch to playing after brief animation delay (handled by frontend)
    room.status = 'playing';

    return { success: true, gameState };
  }

  // ── Gameplay ──────────────────────────────────────────────

  selectQuestion(roomCode, questionKey, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || room.status !== 'playing') return { success: false };
    if (!this._isCurrentTurn(room, playerUUID)) return { success: false, error: 'Ce n\'est pas ton tour.' };

    const cell = room.grid[questionKey];
    if (!cell || cell.completed || cell.locked) return { success: false };

    cell.locked = true;
    room.activeQuestion = {
      key: questionKey,
      askedBy: playerUUID,
      originalAsker: playerUUID, // ne change jamais, même lors d'un vol
      phase: 'answering',  // answering | revealed | stealing
      timerEndsAt: null,
      graceEndsAt: null,
      stealer: null,
    };

    const question = { ...cell, answer: undefined }; // Hide answer
    return { success: true, question, gameState: this._buildGameState(room) };
  }

  revealAnswer(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return { success: false };
    if (room.activeQuestion.askedBy !== playerUUID) return { success: false, error: 'Seul le joueur qui a sélectionné peut révéler.' };
    if (room.activeQuestion.phase !== 'answering') return { success: false };

    const cell = room.grid[room.activeQuestion.key];
    room.activeQuestion.phase = 'revealed';
    room.activeQuestion.timerEndsAt = Date.now() + STEAL_TIMER_MS;
    room.activeQuestion.graceEndsAt = Date.now() + GRACE_PERIOD_MS;
    room.revealedAnswer = cell.answer;

    return {
      success: true,
      answer: cell.answer,              // envoyé seulement au demandeur
      timerEnd: room.activeQuestion.timerEndsAt,
      graceEnd: room.activeQuestion.graceEndsAt,
      questionKey: room.activeQuestion.key,
      gameState: this._buildGameState(room),
    };
  }

  autoCloseQuestion(roomCode, questionKey) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return null;
    if (room.activeQuestion.key !== questionKey) return null;
    if (room.activeQuestion.phase === 'answering') return null; // Not yet revealed

    // Only close if still in revealed/stealing phase and timer expired
    if (Date.now() < room.activeQuestion.timerEndsAt) return null;

    const nextPlayer = this._getNextRandomPlayer(room);
    const answer = room.grid[questionKey]?.answer || room.revealedAnswer;
    this._closeQuestion(room, questionKey, true);
    room.currentTurn = nextPlayer;

    return { closed: true, nextPlayer, answer, gameState: this._buildGameState(room) };
  }

  claimCorrect(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return { success: false };
    if (room.activeQuestion.askedBy !== playerUUID) return { success: false };
    if (!['revealed', 'stealing'].includes(room.activeQuestion.phase)) return { success: false };

    const cell = room.grid[room.activeQuestion.key];
    const points = cell.points;

    this._addPoints(room, playerUUID, points);
    this._clearTimer(roomCode);
    const key = room.activeQuestion.key;
    const answer = room.grid[key]?.answer || room.revealedAnswer;
    this._closeQuestion(room, key, true);
    room.currentTurn = playerUUID;

    const player = room.players[playerUUID];
    return {
      success: true,
      player: { uuid: playerUUID, name: player.name },
      points,
      newScore: player.score,
      nextPlayer: playerUUID,
      answer, // pour diffusion à tous
      gameState: this._buildGameState(room),
    };
  }

  buzzSteal(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return { success: false };
    if (room.activeQuestion.phase !== 'revealed') return { success: false };

    // Bloquer l'auto-vol (utilise originalAsker, pas askedBy qui change)
    if (room.activeQuestion.originalAsker === playerUUID) {
      return { success: false, error: 'Tu ne peux pas voler ta propre question.' };
    }

    // Bloquer si la période de grâce n'est pas écoulée
    if (room.activeQuestion.graceEndsAt && Date.now() < room.activeQuestion.graceEndsAt) {
      return { success: false, error: 'Attends la fin du délai de validation.' };
    }

    const stealer = room.players[playerUUID];
    if (!stealer || stealer.lives <= 0) return { success: false, error: 'Plus de vies.' };

    const victim = room.players[room.activeQuestion.originalAsker];

    room.activeQuestion.phase = 'stealing';
    room.activeQuestion.stealer = playerUUID;
    room.activeQuestion.askedBy = playerUUID; // pour claim_correct

    return {
      success: true,
      stealer: { uuid: playerUUID, name: stealer.name },
      victim: { uuid: victim?.uuid, name: victim?.name },
      gameState: this._buildGameState(room),
    };
  }

  // Le joueur admet s'être trompé → ouvre le buzz immédiatement
  claimWrong(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return { success: false };
    if (room.activeQuestion.originalAsker !== playerUUID) return { success: false };
    if (room.activeQuestion.phase !== 'revealed') return { success: false };

    // Expire la période de grâce immédiatement
    room.activeQuestion.graceEndsAt = Date.now() - 1;

    return { success: true, gameState: this._buildGameState(room) };
  }

  stealCorrect(roomCode, playerUUID) {
    return this.claimCorrect(roomCode, playerUUID);
  }

  stealWrong(roomCode, playerUUID) {
    const room = this.rooms[roomCode];
    if (!room || !room.activeQuestion) return { success: false };
    if (room.activeQuestion.stealer !== playerUUID && room.activeQuestion.askedBy !== playerUUID) return { success: false };

    const player = room.players[playerUUID];
    if (!player) return { success: false };

    this._loseLife(room, playerUUID);

    // Re-open stealing to others
    room.activeQuestion.phase = 'revealed';
    room.activeQuestion.stealer = null;
    room.activeQuestion.askedBy = null; // Anyone can now buzz

    const allDead = Object.values(room.players).every(p => p.lives <= 0 || !p.connected);
    let gameOver = false;
    let nextPlayer = null;

    let finalAnswer = null;
    if (allDead || Date.now() >= room.activeQuestion.timerEndsAt) {
      gameOver = true;
      nextPlayer = this._getNextRandomPlayer(room, playerUUID);
      const key = room.activeQuestion.key;
      finalAnswer = room.grid[key]?.answer || room.revealedAnswer;
      this._closeQuestion(room, key, true);
      room.currentTurn = nextPlayer;
    }

    return {
      success: true,
      player: { uuid: playerUUID, name: player.name },
      livesLeft: player.lives,
      gameOver,
      nextPlayer,
      answer: finalAnswer,
      gameState: this._buildGameState(room),
    };
  }

  // ── Internals ─────────────────────────────────────────────

  _addPoints(room, playerUUID, points) {
    const player = room.players[playerUUID];
    if (!player) return;
    player.score += points;
    if (room.teamsEnabled && player.teamId && room.teams[player.teamId]) {
      room.teams[player.teamId].score += points;
    }
  }

  _loseLife(room, playerUUID) {
    const player = room.players[playerUUID];
    if (!player) return;
    player.lives = Math.max(0, player.lives - 1);
    if (room.teamsEnabled && player.teamId && room.teams[player.teamId]) {
      room.teams[player.teamId].lives = Math.max(0, room.teams[player.teamId].lives - 1);
    }
  }

  _closeQuestion(room, questionKey, completed) {
    // Mémorise la réponse avant de l'effacer (pour la diffuser à la fermeture)
    const finalAnswer = room.grid[questionKey]?.answer || room.revealedAnswer;

    if (room.grid[questionKey]) {
      room.grid[questionKey].completed = completed;
      room.grid[questionKey].locked = false;
    }
    room.activeQuestion = null;
    room.revealedAnswer = null;

    // Check if game is over (all cells completed)
    const allDone = Object.values(room.grid).every(c => c.completed);
    if (allDone) room.status = 'finished';

    return finalAnswer; // retourné pour diffusion
  }

  _buildGameState(room) {
    return {
      code: room.code,
      status: room.status,
      creatorUUID: room.creatorUUID,
      players: room.players,
      teams: room.teams,
      teamsEnabled: room.teamsEnabled,
      selectedPackId: room.selectedPackId,
      currentTurn: room.currentTurn,
      categories: room.categories,
      levels: room.levels,
      grid: room.grid,
      activeQuestion: room.activeQuestion,
      revealedAnswer: room.revealedAnswer,
    };
  }

  // ── Public Getters ────────────────────────────────────────

  getAvailablePacks() {
    return this.packsCache.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      emoji: p.emoji || '🎮',
      categoryCount: p.categories?.length || 0,
      questionCount: p.categories?.reduce((acc, c) => acc + (c.questions?.length || 0), 0) || 0,
    }));
  }
}

module.exports = GameManager;