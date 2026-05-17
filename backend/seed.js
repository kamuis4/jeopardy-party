// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — Script de seed MongoDB
//
//  Usage :
//    node seed.js           → insère/met à jour tous les packs de packs.js
//    node seed.js --reset   → supprime TOUT puis réinsère
//
//  Prérequis : MONGODB_URI dans .env
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const { connectDB } = require('./db');
const Pack = require('./models/Pack');
const PACKS = require('./packs');

async function seed() {
  const connected = await connectDB();
  if (!connected) {
    console.error('\n❌ Impossible de se connecter. Vérifie MONGODB_URI dans .env\n');
    process.exit(1);
  }

  const reset = process.argv.includes('--reset');

  if (reset) {
    await Pack.deleteMany({});
    console.log('🗑  Collection vidée (--reset)\n');
  }

  let inserted = 0;
  let updated  = 0;

  for (const pack of PACKS) {
    const existing = await Pack.findOne({ id: pack.id });

    if (existing) {
      await Pack.findOneAndUpdate({ id: pack.id }, pack, { new: true });
      console.log(`  ♻️  Mis à jour : "${pack.name}" (${pack.id})`);
      updated++;
    } else {
      await Pack.create(pack);
      console.log(`  ✅ Inséré    : "${pack.name}" (${pack.id})`);
      inserted++;
    }
  }

  console.log(`\n🎉 Seed terminé — ${inserted} insérés, ${updated} mis à jour`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erreur seed :', err);
  process.exit(1);
});
