
const mongoose = require('mongoose');

const suggestedEventSchema = new mongoose.Schema({
  suggestedEventId: { type: Number, required: true, unique: true },
  eventId: { type: Number, required: true, ref: 'Event' },
  userId: { type: Number, required: true, ref: 'User' },
  suggestedDate: { type: Date, default: Date.now }
});

const SuggestedEvent = mongoose.model('SuggestedEvent', suggestedEventSchema);
module.exports = SuggestedEvent;
