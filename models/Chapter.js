// models/Chapter.js
const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
