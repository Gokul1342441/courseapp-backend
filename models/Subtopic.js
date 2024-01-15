// models/Subtopic.js
const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  title: String,
  content: String,
  order: Number,
  updated_at: { type: Date, default: Date.now },
});

const Subtopic = mongoose.model('Subtopic', subtopicSchema);

module.exports = Subtopic;
