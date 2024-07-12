const mongoose = require('mongoose');

const savedEventSchema = new mongoose.Schema({
  savedEventId: { type: Number, required: true, unique: true },
  eventId: { type: Number, required: true, ref: 'Event' },
  userId: { type: Number, required: true, ref: 'User' },
  savedDate: { type: Date, default: Date.now }
});

const SavedEvent = mongoose.model('SavedEvent', savedEventSchema);
module.exports = SavedEvent;
