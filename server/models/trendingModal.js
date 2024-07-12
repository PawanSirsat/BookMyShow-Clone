const mongoose = require('mongoose');

const trendingEventSchema = new mongoose.Schema({
  trendingEventId: { type: Number, required: true, unique: true },
  eventId: { type: Number, required: true, ref: 'Event' },
  location: { type: String, required: true },
  ranking: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

const TrendingEvent = mongoose.model('TrendingEvent', trendingEventSchema);
module.exports = TrendingEvent;
