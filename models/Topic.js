// models/Topic.js
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  subtopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtopic' }],
  updated_at: { type: Date, default: Date.now },
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
