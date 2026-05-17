// ─────────────────────────────────────────────────────────────
//  JEOPARDY PARTY — Modèle Mongoose : Pack
// ─────────────────────────────────────────────────────────────

const { Schema, model } = require('mongoose');

// ── Question ──────────────────────────────────────────────────
const QuestionSchema = new Schema(
  {
    level:    { type: Number, required: true, min: 1, max: 5 },
    points:   { type: Number, required: true },
    question: { type: String, required: true, trim: true },
    answer:   { type: String, required: true, trim: true },
    type:     { type: String, enum: ['text', 'image', 'audio'], default: 'text' },
    mediaUrl: { type: String, default: null },
  },
  { _id: false }
);

// ── Catégorie ─────────────────────────────────────────────────
const CategorySchema = new Schema(
  {
    name:      { type: String, required: true, trim: true },
    questions: {
      type: [QuestionSchema],
      validate: {
        validator: (qs) => qs.length === 5,
        message: 'Une catégorie doit contenir exactement 5 questions (levels 1 à 5).',
      },
    },
  },
  { _id: false }
);

// ── Pack ──────────────────────────────────────────────────────
const PackSchema = new Schema(
  {
    // Identifiant unique slug (ex: "culture-generale")
    id:          { type: String, required: true, unique: true, trim: true },
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    emoji:       { type: String, default: '🎮' },
    categories:  { type: [CategorySchema], default: [] },
  },
  { timestamps: true }
);

// Index sur id pour les lookups rapides
PackSchema.index({ id: 1 });

module.exports = model('Pack', PackSchema);
