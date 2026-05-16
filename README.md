# ⚡ JEOPARDY PARTY

> Quiz multijoueur en temps réel, style Jeopardy!, thème Dark Gaming / Cyberpunk.
> Hébergement 100% gratuit. Zéro inscription.

---

## 🗂 Structure du Projet

```
jeopardy-party/
├── backend/
│   ├── server.js          ← Express + Socket.io
│   ├── gameManager.js     ← Logique de jeu (en mémoire)
│   ├── packs.js           ← Questions (à brancher sur MongoDB/Supabase)
│   ├── .env.example
│   ├── render.yaml        ← Config déploiement Render
│   └── package.json
└── frontend/
    ├── netlify.toml       ← Config déploiement Netlify
    └── public/
        ├── index.html     ← SPA unique
        ├── style.css      ← Thème Cyberpunk complet
        ├── app.js         ← Logique client + Socket.io
        └── config.js      ← URL du backend (à modifier)
```

---

## 🚀 Démarrage Local

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Édite .env si besoin
npm run dev   # démarre avec nodemon sur :3001
```

### 2. Frontend

Ouvre simplement `frontend/public/index.html` dans ton navigateur avec un serveur local :

```bash
# Option A : VS Code → "Live Server" (clic droit sur index.html)
# Option B : Python
cd frontend/public && python3 -m http.server 5500
# Option C : npx
npx serve frontend/public
```

Assure-toi que `config.js` pointe sur `http://localhost:3001`.

---

## ☁️ Déploiement Gratuit (Production)

### Backend → [Render.com](https://render.com)

1. Crée un compte Render (gratuit)
2. **New > Web Service** → connecte ton repo GitHub
3. Root directory : `backend/`
4. Build command : `npm install`
5. Start command : `npm start`
6. Variables d'environnement :
   - `FRONTEND_URL` = URL de ton site Netlify (ex: `https://jeopardy-party.netlify.app`)
7. Copie l'URL Render (ex: `https://jeopardy-party-backend.onrender.com`)

> ⚠️ Le plan gratuit Render dort après 15 min d'inactivité.
> Pour éviter ça, utilise [cron-job.org](https://cron-job.org) pour pinger `/` toutes les 10 min.

### Frontend → [Netlify](https://netlify.com)

1. Crée un compte Netlify
2. **Add new site > Import from Git** → connecte ton repo
3. Base directory : `frontend/`
4. Publish directory : `public/`
5. **Build command** : (laisser vide, pas de build nécessaire)
6. Modifie `frontend/public/config.js` :
   ```js
   window.BACKEND_URL = 'https://jeopardy-party-backend.onrender.com';
   ```
7. Pousse sur Git → déploiement automatique ✓

---

## 🎮 Fonctionnalités Implémentées

| Feature | Statut |
|---------|--------|
| Création/rejoindre un salon | ✅ |
| Reconnexion automatique (UUID LocalStorage) | ✅ |
| Lobby temps réel (joueurs en direct) | ✅ |
| Mode Équipe (rejoindre une équipe) | ✅ |
| Sélection de pack de questions | ✅ |
| Animation "qui commence ?" (roulette) | ✅ |
| Grille Jeopardy responsive | ✅ |
| Verrouillage des cases en temps réel | ✅ |
| Révélation de réponse | ✅ |
| Timer 15s avec barre animée | ✅ |
| Système "Vol de question" (Buzz) | ✅ |
| Système de vies (3 HP / joueur) | ✅ |
| Animations perte de vie (shake) | ✅ |
| Synchronisation audio (Blind Test) | ✅ |
| Support images dans les questions | ✅ |
| HUD scores en temps réel | ✅ |
| Podium final | ✅ |
| Thème Dark / Cyberpunk | ✅ |
| Effets glitch, néons, scanlines | ✅ |

---

## 🗃 Ajouter des Questions (Base de Données)

### Option A : Modifier `packs.js` directement (simple)

Edite le fichier `backend/packs.js` et suis le format existant.

### Option B : MongoDB Atlas (recommandé en prod)

1. Crée un cluster gratuit sur [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Installe Mongoose : `npm install mongoose`
3. Ajoute dans `server.js` :
   ```js
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI);
   ```
4. Crée un schéma `Pack` et remplace `PACKS` dans `gameManager.js` par des queries `Pack.find()`.

### Option C : Supabase (PostgreSQL)

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Crée les tables `packs`, `categories`, `questions`
3. Utilise `@supabase/supabase-js` pour requêter depuis le backend

---

## 🎨 Personnalisation du Thème

Toutes les couleurs sont dans les variables CSS (`style.css`, ligne 1) :

```css
:root {
  --cyan:   #00f5ff;   /* couleur principale */
  --purple: #b400ff;   /* accent secondaire */
  --red:    #ff1a4b;   /* danger / vies */
  --gold:   #ffd700;   /* points / podium */
  --bg:     #0a0a0f;   /* fond principal */
}
```

---

## 📡 Événements Socket.io

| Client → Serveur | Description |
|-----------------|-------------|
| `create_room` | Créer un salon |
| `join_room` | Rejoindre un salon |
| `rejoin` | Reconnexion après refresh |
| `select_pack` | Choisir un pack (créateur) |
| `toggle_teams` | Activer/désactiver équipes |
| `join_team` | Rejoindre une équipe |
| `start_game` | Lancer la partie (créateur) |
| `select_question` | Choisir une case (joueur actif) |
| `reveal_answer` | Révéler la réponse |
| `claim_correct` | Valider "j'ai juste" |
| `buzz_steal` | Buzzer pour voler |
| `steal_correct` | Vol réussi |
| `steal_wrong` | Vol raté |
| `play_audio` | Synchroniser un audio |

| Serveur → Client | Description |
|-----------------|-------------|
| `room_update` | Mise à jour du lobby |
| `game_started` | Partie démarrée |
| `game_state_update` | État du jeu modifié |
| `question_opened` | Question affichée |
| `answer_revealed` | Réponse + timer |
| `steal_attempt` | Quelqu'un buzze |
| `points_awarded` | Points remportés |
| `life_lost` | Vie perdue |
| `question_closed` | Question terminée |
| `question_timeout` | Timer expiré |
| `sync_audio` | Lecture audio synchronisée |

---

## 📝 Licence

MIT — Projet libre, faites-en ce que vous voulez. 🎉
