const mongoose = require('mongoose');

const techsSchema = new mongoose.Schema(
  {
    tech: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    effect: { type: String },
    effectDuration: { type: String },
    effectEase: { type: String },
  },
  {
    timestamps: true,
  }
);

const Technology = mongoose.model('Technology', techsSchema);

module.exports = { Technology };
