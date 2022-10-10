const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    technology: [String],
    link: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    imgStart: { type: Boolean, default: true, required: true },
    effect: { type: String },
    effectDuration: { type: String },
    effectEase: { type: String },
    effectDelay: { type: String },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = { Project };
