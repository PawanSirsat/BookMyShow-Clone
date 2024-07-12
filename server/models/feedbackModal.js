const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackId: { type: Number, required: true, unique: true },
  eventId: { type: Number, required: true, ref: 'Event' },
  userId: { type: Number, required: true, ref: 'User' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String },
  created_at: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
