// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — Connexion MongoDB Atlas
// ─────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('[DB] ⚠️  MONGODB_URI absent — packs chargés depuis packs.js (fallback local)');
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // échoue vite si l'URI est mauvais
    });
    isConnected = true;
    console.log('[DB] ✅ Connecté à MongoDB Atlas');
    return true;
  } catch (err) {
    console.error('[DB] ❌ Connexion échouée :', err.message);
    console.warn('[DB] ⚠️  Fallback sur packs.js local');
    return false;
  }
}

function getConnectionStatus() {
  return isConnected;
}

module.exports = { connectDB, getConnectionStatus };
