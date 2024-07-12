const mongoose = require('mongoose');

const eventTagSchema = new mongoose.Schema({
  tagId: { type: Number, required: true, unique: true },
  tagName: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const EventTag = mongoose.model('EventTag', eventTagSchema);
module.exports = EventTag;
