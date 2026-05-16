// ═══════════════════════════════════════════════════════════
//  JEOPARDY PARTY — Frontend App (app.js)
//  Vanilla JS SPA — Socket.io client
// ═══════════════════════════════════════════════════════════

const BACKEND_URL = 'https://jeopardy-party.onrender.com';
const MAX_LIVES = 3;

// ── State ──────────────────────────────────────────────────
const state = {
  socket: null,
  myUUID: null,
  myName: null,
  roomCode: null,
  gameState: null,
  currentQuestion: null,  // { key, category, points, question, type, mediaUrl }
  timerInterval: null,
  timerEnd: null,
  availablePacks: [],
};

// ── Helpers ────────────────────────────────────────────────

function getOrCreateUUID() {
  let uuid = localStorage.getItem('jp_uuid');
  if (!uuid) {
    uuid = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    localStorage.setItem('jp_uuid', uuid);
  }
  return uuid;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
}

function showToast(msg, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function showError(elementId, msg) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function playerName(uuid) {
  if (!state.gameState?.players) return uuid;
  return state.gameState.players[uuid]?.name || uuid;
}

function isMyTurn() {
  if (!state.gameState) return false;
  const { currentTurn, teamsEnabled, players } = state.gameState;
  if (teamsEnabled) {
    const myTeamId = players[state.myUUID]?.teamId;
    return currentTurn === myTeamId;
  }
  return currentTurn === state.myUUID;
}

function amIAsker() {
  return state.gameState?.activeQuestion?.askedBy === state.myUUID;
}

function amIStealer() {
  return state.gameState?.activeQuestion?.stealer === state.myUUID;
}

function myLives() {
  return state.gameState?.players[state.myUUID]?.lives ?? MAX_LIVES;
}

// ── Socket Setup ────────────────────────────────────────────

function initSocket() {
  state.socket = io(BACKEND_URL, { transports: ['websocket', 'polling'] });

  state.socket.on('connect', () => {
    console.log('[Socket] Connected:', state.socket.id);
    
    const savedRoom = localStorage.getItem('jp_room');
    
    if (savedRoom && state.myUUID) {
      state.socket.emit('rejoin', { playerUUID: state.myUUID, roomCode: savedRoom }, (res) => {
        if (res.success) {
          state.roomCode = savedRoom;
          state.gameState = res.room;
          const status = res.room.status;
          if (status === 'lobby' || status === 'starting') {
            renderLobby(res.room);
            showScreen('screen-lobby');
          } else if (status === 'playing') {
            renderGame(res.room);
            showScreen('screen-game');
          }
          showToast('Reconnexion réussie ✓', 'success');
        } else {
          localStorage.removeItem('jp_room');
          showScreen('screen-home');
        }
      });
    } else {
      showScreen('screen-home');
    }
  });

  state.socket.on('connect_error', () => {
    console.error('[Socket] Connection failed');
    showScreen('screen-home');
  });

  state.socket.on('disconnect', () => showToast('Connexion perdue… reconnexion…', 'error', 8000));

  state.socket.on('room_update', (room) => {
    state.gameState = room;
    if (document.getElementById('screen-lobby').classList.contains('active')) {
      renderLobby(room);
    }
  });

  state.socket.on('game_started', (gameState) => {
    state.gameState = gameState;
    showPickerAnimation(gameState, () => {
      renderGame(gameState);
      showScreen('screen-game');
    });
  });

  state.socket.on('game_state_update', (gameState) => {
    state.gameState = gameState;
    if (document.getElementById('screen-game').classList.contains('active')) {
      renderHUD(gameState);
      renderGrid(gameState);
    }
    if (document.getElementById('screen-question').classList.contains('active')) {
      renderHUD(gameState);
      updateQuestionActions(gameState);
    }
    if (gameState.status === 'finished') {
      setTimeout(() => showPodium(gameState), 1000);
    }
  });

  state.socket.on('question_opened', (question) => {
    state.currentQuestion = question;
    openQuestionModal(question);
  });

  state.socket.on('answer_revealed', ({ answer, timerEnd }) => {
    showAnswerBlock(answer, timerEnd);
    updateQuestionActions(state.gameState);
    startTimerUI(timerEnd);
  });

  state.socket.on('steal_attempt', ({ stealer, victim }) => {
    showStealBanner(stealer.name);
    showToast(`⚡ ${stealer.name} tente le VOL !`, 'steal', 4000);
    updateQuestionActions(state.gameState);
  });

  state.socket.on('points_awarded', ({ player, points }) => {
    showToast(`✅ ${player.name} remporte ${points} pts !`, 'success', 4000);
  });

  state.socket.on('life_lost', ({ player, livesLeft }) => {
    showToast(`💔 ${player.name} perd une vie ! (${livesLeft} restante${livesLeft > 1 ? 's' : ''})`, 'error', 3500);
    shakeLifeUI(player.uuid);
  });

  state.socket.on('question_closed', ({ nextPlayer, reason }) => {
    closeQuestionModal();
    stopTimerUI();
    if (nextPlayer) {
      const name = playerName(nextPlayer);
      showToast(`🎯 C'est au tour de ${name}`, 'info', 3000);
    }
  });

  state.socket.on('question_timeout', ({ nextPlayer }) => {
    showToast('⏰ Temps écoulé ! Personne ne marque.', 'error', 3500);
    closeQuestionModal();
    stopTimerUI();
    if (nextPlayer) showToast(`🎯 Au tour de ${playerName(nextPlayer)}`, 'info', 3000);
  });

  state.socket.on('sync_audio', ({ audioUrl, timestamp }) => {
    const audio = document.getElementById('q-audio');
    if (audio && audio.src !== audioUrl) {
      audio.src = audioUrl;
    }
    if (audio) {
      audio.currentTime = (Date.now() - timestamp) / 1000;
      audio.play().catch(() => {});
    }
  });

  state.socket.on('error_msg', (msg) => showToast(`⚠ ${msg}`, 'error'));
} // <--- CETTE ACCOLADE FERME MAINTENANT BIEN TOUTE LA FONCTION
// ── Home Screen ─────────────────────────────────────────────

async function loadPacks() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/packs`);
    state.availablePacks = await res.json();
  } catch (e) {
    console.warn('Could not load packs', e);
    state.availablePacks = [];
  }
}

document.getElementById('btn-create').addEventListener('click', () => {
  const name = document.getElementById('create-name').value.trim();
  if (!name) { showError('home-error', 'Entre un pseudo pour continuer.'); return; }
  state.myName = name;
  state.myUUID = getOrCreateUUID();
  state.socket.emit('create_room', { playerUUID: state.myUUID, playerName: name }, (res) => {
    if (!res.success) { showError('home-error', res.error || 'Erreur création.'); return; }
    state.roomCode = res.roomCode;
    state.gameState = res.room;
    localStorage.setItem('jp_room', res.roomCode);
    renderLobby(res.room);
    showScreen('screen-lobby');
  });
});

document.getElementById('btn-join').addEventListener('click', () => {
  const name = document.getElementById('join-name').value.trim();
  const code = document.getElementById('join-code').value.trim().toUpperCase();
  if (!name) { showError('home-error', 'Entre un pseudo.'); return; }
  if (!code || code.length < 4) { showError('home-error', 'Entre un code de salon valide.'); return; }
  state.myName = name;
  state.myUUID = getOrCreateUUID();
  state.socket.emit('join_room', { playerUUID: state.myUUID, playerName: name, roomCode: code }, (res) => {
    if (!res.success) { showError('home-error', res.error || 'Salon introuvable.'); return; }
    state.roomCode = code;
    state.gameState = res.room;
    localStorage.setItem('jp_room', code);
    renderLobby(res.room);
    showScreen('screen-lobby');
  });
});

// Allow Enter key in inputs
['create-name', 'join-name', 'join-code'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (id === 'create-name') document.getElementById('btn-create').click();
      else document.getElementById('btn-join').click();
    }
  });
});

// ── Lobby ───────────────────────────────────────────────────

function renderLobby(room) {
  const isCreator = room.creatorUUID === state.myUUID;

  // Code display
  document.getElementById('lobby-code').textContent = room.code;

  // Players
  const playersList = document.getElementById('players-list');
  const players = Object.values(room.players);
  document.getElementById('player-count').textContent = players.filter(p => p.connected).length;

  playersList.innerHTML = '';
  players.forEach(p => {
    const card = document.createElement('div');
    card.className = `player-card ${p.connected ? 'connected' : 'disconnected'}`;
    const initials = p.name.substring(0, 2).toUpperCase();
    const tags = [p.isCreator ? '👑 Créateur' : '', !p.connected ? '⚡ Déconnecté' : ''].filter(Boolean).join(' • ');
    card.innerHTML = `
      <div class="player-avatar">${initials}</div>
      <div class="player-info">
        <div class="player-name">${p.name}${p.uuid === state.myUUID ? ' <span style="color:var(--cyan);font-size:0.75rem">(toi)</span>' : ''}</div>
        <div class="player-tag">${tags || '🎮 Prêt'}</div>
      </div>
    `;
    playersList.appendChild(card);
  });

  // Teams
  const teamsSection = document.getElementById('teams-section');
  const teamsContainer = document.getElementById('teams-container');
  if (room.teamsEnabled && Object.keys(room.teams).length > 0) {
    teamsSection.style.display = 'block';
    teamsContainer.innerHTML = '';
    Object.values(room.teams).forEach(team => {
      const myTeamId = room.players[state.myUUID]?.teamId;
      const card = document.createElement('div');
      card.className = `team-card ${team.id}${myTeamId === team.id ? ' my-team' : ''}`;
      const membersHTML = team.members.length
        ? team.members.map(uid => `<span class="team-member-chip">${room.players[uid]?.name || uid}</span>`).join('')
        : '<span style="color:var(--text-muted);font-size:0.8rem">Aucun membre</span>';
      card.innerHTML = `
        <div class="team-name">${team.name}</div>
        <div class="team-members">${membersHTML}</div>
        ${myTeamId !== team.id ? `<button class="join-team-btn" data-teamid="${team.id}">Rejoindre</button>` : '<div style="margin-top:8px;font-size:0.8rem;color:var(--text-dim)">✓ Ton équipe</div>'}
      `;
      teamsContainer.appendChild(card);
    });
    // Attach join team handlers
    teamsContainer.querySelectorAll('.join-team-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.socket.emit('join_team', { roomCode: state.roomCode, teamId: btn.dataset.teamid, playerUUID: state.myUUID });
      });
    });
  } else {
    teamsSection.style.display = 'none';
  }

  // Config (creator only)
  const configSection = document.getElementById('config-section');
  configSection.style.display = isCreator ? 'block' : 'none';
  if (isCreator) renderPackSelector(room);

  // Teams toggle (creator only)
  const teamsToggle = document.getElementById('toggle-teams');
  teamsToggle.checked = room.teamsEnabled;
  document.getElementById('toggle-teams-label').textContent = room.teamsEnabled ? 'Activé' : 'Désactivé';

  // Start button
  const btnStart = document.getElementById('btn-start');
  const waitingMsg = document.getElementById('waiting-msg');
  if (isCreator) {
    btnStart.style.display = 'flex';
    waitingMsg.style.display = 'none';
  } else {
    btnStart.style.display = 'none';
    waitingMsg.style.display = 'block';
  }
}

function renderPackSelector(room) {
  const container = document.getElementById('pack-selector');
  container.innerHTML = '';
  state.availablePacks.forEach(pack => {
    const div = document.createElement('div');
    div.className = `pack-option${pack.id === room.selectedPackId ? ' selected' : ''}`;
    div.innerHTML = `
      <span class="pack-emoji">${pack.emoji}</span>
      <div class="pack-info">
        <div class="pack-name">${pack.name}</div>
        <div class="pack-desc">${pack.description} — ${pack.categoryCount} catégories · ${pack.questionCount} questions</div>
      </div>
    `;
    div.addEventListener('click', () => {
      state.socket.emit('select_pack', { roomCode: state.roomCode, packId: pack.id, playerUUID: state.myUUID });
    });
    container.appendChild(div);
  });
}

// Copy code
document.getElementById('btn-copy-code').addEventListener('click', () => {
  navigator.clipboard.writeText(state.roomCode || '').then(() => showToast('Code copié !', 'success', 2000));
});

// Teams toggle
document.getElementById('toggle-teams').addEventListener('change', (e) => {
  state.socket.emit('toggle_teams', { roomCode: state.roomCode, enabled: e.target.checked, playerUUID: state.myUUID });
});

// Start game
document.getElementById('btn-start').addEventListener('click', () => {
  const btn = document.getElementById('btn-start');
  btn.disabled = true;
  state.socket.emit('start_game', { roomCode: state.roomCode, playerUUID: state.myUUID }, (res) => {
    if (!res.success) {
      showError('lobby-error', res.error || 'Impossible de démarrer.');
      btn.disabled = false;
    }
  });
});

// ── Picker Animation ────────────────────────────────────────

function showPickerAnimation(gameState, callback) {
  const overlay = document.getElementById('picker-overlay');
  const roulette = document.getElementById('picker-roulette');
  const winnerEl = document.getElementById('picker-winner');

  overlay.style.display = 'flex';
  winnerEl.style.display = 'none';
  roulette.innerHTML = '';

  const players = Object.values(gameState.players).filter(p => p.connected);
  const winner = players.find(p => p.uuid === gameState.currentTurn) || players[0];

  // Render all names
  const chips = players.map(p => {
    const el = document.createElement('div');
    el.className = 'picker-name';
    el.textContent = p.name;
    el.dataset.uuid = p.uuid;
    roulette.appendChild(el);
    return el;
  });

  // Roulette spin
  let iteration = 0;
  const totalSpins = 20 + Math.floor(Math.random() * 20);
  const speeds = [80, 80, 100, 120, 150, 200, 250, 300, 400];

  function spin() {
    chips.forEach(c => c.classList.remove('highlight'));
    const pick = chips[iteration % chips.length];
    pick.classList.add('highlight');
    iteration++;

    if (iteration < totalSpins) {
      const speedIdx = Math.min(Math.floor(iteration / 5), speeds.length - 1);
      const delay = iteration >= totalSpins - 5
        ? speeds[speeds.length - 1 - (totalSpins - iteration)]
        : speeds[speedIdx];
      setTimeout(spin, delay);
    } else {
      // Land on winner
      chips.forEach(c => c.classList.remove('highlight'));
      const winChip = chips.find(c => c.dataset.uuid === winner.uuid);
      if (winChip) winChip.classList.add('highlight');

      setTimeout(() => {
        roulette.style.display = 'none';
        winnerEl.style.display = 'block';
        winnerEl.textContent = `${winner.name} commence !`;
        setTimeout(() => {
          overlay.style.display = 'none';
          roulette.style.display = 'flex';
          callback();
        }, 2000);
      }, 800);
    }
  }
  spin();
}

// ── Game Grid ───────────────────────────────────────────────

function renderGame(gameState) {
  renderHUD(gameState);
  renderGrid(gameState);
}

function renderHUD(gameState) {
  const scoresEl = document.getElementById('hud-scores');
  const turnEl = document.getElementById('turn-player-name');
  const players = Object.values(gameState.players);

  // Turn indicator
  const turnPlayer = gameState.players[gameState.currentTurn];
  turnEl.textContent = turnPlayer ? turnPlayer.name : '---';

  // Scores
  scoresEl.innerHTML = '';
  players.forEach(p => {
    const isActive = gameState.currentTurn === p.uuid || gameState.currentTurn === p.teamId;
    const chip = document.createElement('div');
    chip.className = `score-chip${isActive ? ' is-turn' : ''}`;
    chip.id = `score-chip-${p.uuid}`;
    const heartsHTML = Array.from({ length: MAX_LIVES }, (_, i) => {
      const dead = i >= p.lives;
      return `<span class="heart${dead ? ' dead' : ''}" data-idx="${i}" data-uuid="${p.uuid}">${dead ? '🖤' : '❤️'}</span>`;
    }).join('');
    chip.innerHTML = `
      <div class="score-chip-name">${p.name}${p.uuid === state.myUUID ? ' ★' : ''}</div>
      <div class="score-chip-score">${p.score} pts</div>
      <div class="score-chip-lives">${heartsHTML}</div>
    `;
    scoresEl.appendChild(chip);
  });
}

function shakeLifeUI(uuid) {
  const chip = document.getElementById(`score-chip-${uuid}`);
  if (!chip) return;
  const hearts = chip.querySelectorAll('.heart');
  const lives = state.gameState?.players[uuid]?.lives ?? 0;
  // The just-lost heart is at index `lives`
  const lostHeart = hearts[lives];
  if (lostHeart) {
    lostHeart.classList.add('shake');
    lostHeart.textContent = '🖤';
    lostHeart.classList.add('dead');
    setTimeout(() => lostHeart.classList.remove('shake'), 600);
  }
  // Shake the whole chip
  chip.style.animation = 'heartShake 0.4s ease';
  setTimeout(() => { chip.style.animation = ''; }, 500);
}

function renderGrid(gameState) {
  const grid = document.getElementById('jeopardy-grid');
  const categories = gameState.categories || [];
  const levels = gameState.levels || [1, 2, 3, 4, 5];
  const numCols = categories.length;

  grid.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;

  grid.innerHTML = '';

  // Category headers
  categories.forEach(cat => {
    const header = document.createElement('div');
    header.className = 'grid-cat-header';
    header.textContent = cat;
    grid.appendChild(header);
  });

  // Cells by level
  levels.forEach(level => {
    categories.forEach(cat => {
      const key = `${cat}__${level}`;
      const cell = gameState.grid[key];
      const div = document.createElement('div');

      if (cell) {
        const points = level * 100;
        div.className = `grid-cell${cell.completed ? ' completed' : ''}${cell.locked ? ' locked' : ''}${!isMyTurn() && !cell.completed && !cell.locked ? ' not-my-turn' : ''}`;
        div.textContent = cell.completed ? '' : `${points}`;
        if (!cell.completed && !cell.locked && isMyTurn()) {
          div.addEventListener('click', () => selectQuestion(key));
        }
      } else {
        div.className = 'grid-cell completed';
      }
      grid.appendChild(div);
    });
  });
}

function selectQuestion(key) {
  state.socket.emit('select_question', {
    roomCode: state.roomCode,
    questionKey: key,
    playerUUID: state.myUUID,
  });
}

// ── Question Modal ──────────────────────────────────────────

function openQuestionModal(question) {
  // Populate
  document.getElementById('q-category').textContent = question.category;
  document.getElementById('q-points').textContent = `${question.points} PTS`;
  document.getElementById('q-text').textContent = question.question;

  // Media
  const mediaDiv = document.getElementById('q-media');
  const imgEl = document.getElementById('q-img');
  const audioPlayer = document.getElementById('q-audio-player');
  const audioEl = document.getElementById('q-audio');

  imgEl.style.display = 'none';
  audioPlayer.style.display = 'none';
  mediaDiv.style.display = 'none';

  if (question.type === 'image' && question.mediaUrl) {
    imgEl.src = question.mediaUrl;
    imgEl.style.display = 'block';
    mediaDiv.style.display = 'block';
  } else if (question.type === 'audio' && question.mediaUrl) {
    audioEl.src = question.mediaUrl;
    audioPlayer.style.display = 'flex';
    mediaDiv.style.display = 'block';
    // Auto-play and sync
    const timestamp = Date.now();
    audioEl.play().then(() => {
      state.socket.emit('play_audio', { roomCode: state.roomCode, audioUrl: question.mediaUrl, timestamp });
    }).catch(() => {});
  }

  // Hide answer block
  const answerBlock = document.getElementById('answer-block');
  answerBlock.style.display = 'none';
  const stealBanner = document.getElementById('steal-banner');
  stealBanner.style.display = 'none';

  updateQuestionActions(state.gameState);
  showScreen('screen-question');
}

function showAnswerBlock(answer, timerEnd) {
  state.timerEnd = timerEnd;
  document.getElementById('answer-text').textContent = answer;
  document.getElementById('answer-block').style.display = 'block';
}

function showStealBanner(stealerName) {
  document.getElementById('steal-name').textContent = stealerName;
  document.getElementById('steal-banner').style.display = 'flex';
}

function updateQuestionActions(gameState) {
  if (!gameState?.activeQuestion) return;
  const { phase, askedBy, stealer } = gameState.activeQuestion;

  // Hide all
  ['actions-reveal', 'actions-validate', 'actions-buzz', 'actions-steal-validate', 'actions-observer'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });

  const myLivesLeft = myLives();

  if (phase === 'answering') {
    // Only the asker can reveal
    if (askedBy === state.myUUID) {
      document.getElementById('actions-reveal').style.display = 'flex';
    } else {
      document.getElementById('actions-observer').style.display = 'flex';
    }
  } else if (phase === 'revealed') {
    if (askedBy === state.myUUID) {
      // Asker can claim correct
      document.getElementById('actions-validate').style.display = 'flex';
      if (myLivesLeft > 0) {
        document.getElementById('actions-buzz').style.display = 'flex';
      }
    } else {
      // Others can buzz
      if (myLivesLeft > 0) {
        document.getElementById('actions-buzz').style.display = 'flex';
      } else {
        document.getElementById('actions-observer').style.display = 'flex';
      }
    }
  } else if (phase === 'stealing') {
    if (stealer === state.myUUID || askedBy === state.myUUID) {
      // The stealer validates
      document.getElementById('actions-steal-validate').style.display = 'flex';
    } else {
      document.getElementById('actions-observer').style.display = 'flex';
    }
  }
}

function closeQuestionModal() {
  // Pause audio
  const audioEl = document.getElementById('q-audio');
  if (audioEl) { audioEl.pause(); audioEl.currentTime = 0; }

  if (state.gameState?.status === 'finished') {
    setTimeout(() => showPodium(state.gameState), 500);
  } else {
    showScreen('screen-game');
    renderGame(state.gameState);
  }
}

// ── Timer UI ────────────────────────────────────────────────

function startTimerUI(timerEnd) {
  stopTimerUI();
  const bar = document.getElementById('timer-bar');
  const count = document.getElementById('timer-count');
  const total = 15000;

  function tick() {
    const remaining = Math.max(0, timerEnd - Date.now());
    const pct = (remaining / total) * 100;
    bar.style.width = pct + '%';
    count.textContent = Math.ceil(remaining / 1000);

    if (remaining <= 3000) {
      bar.style.background = 'var(--red)';
      count.style.color = 'var(--red)';
    }

    if (remaining > 0) {
      state.timerInterval = requestAnimationFrame(tick);
    }
  }
  state.timerInterval = requestAnimationFrame(tick);
}

function stopTimerUI() {
  if (state.timerInterval) {
    cancelAnimationFrame(state.timerInterval);
    state.timerInterval = null;
  }
  const bar = document.getElementById('timer-bar');
  const count = document.getElementById('timer-count');
  if (bar) { bar.style.width = '100%'; bar.style.background = ''; }
  if (count) { count.textContent = '15'; count.style.color = ''; }
}

// ── Question Action Buttons ─────────────────────────────────

document.getElementById('btn-reveal').addEventListener('click', () => {
  state.socket.emit('reveal_answer', { roomCode: state.roomCode, playerUUID: state.myUUID });
});

document.getElementById('btn-correct').addEventListener('click', () => {
  state.socket.emit('claim_correct', { roomCode: state.roomCode, playerUUID: state.myUUID });
});

document.getElementById('btn-buzz').addEventListener('click', () => {
  state.socket.emit('buzz_steal', { roomCode: state.roomCode, playerUUID: state.myUUID });
});

document.getElementById('btn-steal-correct').addEventListener('click', () => {
  state.socket.emit('steal_correct', { roomCode: state.roomCode, playerUUID: state.myUUID });
});

document.getElementById('btn-steal-wrong').addEventListener('click', () => {
  state.socket.emit('steal_wrong', { roomCode: state.roomCode, playerUUID: state.myUUID });
});

// Audio play button (local play, also syncs others)
document.getElementById('btn-play-audio').addEventListener('click', () => {
  const audioEl = document.getElementById('q-audio');
  const question = state.currentQuestion;
  if (!audioEl || !question?.mediaUrl) return;
  audioEl.currentTime = 0;
  audioEl.play().catch(() => {});
  const timestamp = Date.now();
  state.socket.emit('play_audio', { roomCode: state.roomCode, audioUrl: question.mediaUrl, timestamp });
});

// Volume control
document.getElementById('audio-volume').addEventListener('input', (e) => {
  const audioEl = document.getElementById('q-audio');
  if (audioEl) audioEl.volume = parseFloat(e.target.value);
});

// ── Podium ──────────────────────────────────────────────────

function showPodium(gameState) {
  const list = document.getElementById('podium-list');
  list.innerHTML = '';
  const players = Object.values(gameState.players).sort((a, b) => b.score - a.score);
  const medals = ['🥇', '🥈', '🥉'];

  players.forEach((p, i) => {
    const entry = document.createElement('div');
    entry.className = 'podium-entry';
    entry.style.setProperty('--delay', `${i * 0.15}s`);
    entry.innerHTML = `
      <div class="podium-rank">${medals[i] || `#${i + 1}`}</div>
      <div class="player-name">${p.name}${p.uuid === state.myUUID ? ' (toi)' : ''}</div>
      <div class="score-val">${p.score} pts</div>
    `;
    list.appendChild(entry);
  });

  showScreen('screen-podium');
}

document.getElementById('btn-back-home').addEventListener('click', () => {
  localStorage.removeItem('jp_room');
  state.roomCode = null;
  state.gameState = null;
  state.currentQuestion = null;
  showScreen('screen-home');
});

// ── Init ────────────────────────────────────────────────────

(async function init() {
  state.myUUID = getOrCreateUUID();
  await loadPacks();
  initSocket();
  showScreen('screen-home');
})();
