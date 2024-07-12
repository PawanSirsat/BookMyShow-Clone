const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const eventSchema = new mongoose.Schema({
  eventId: { type: String, default: uuidv4, required: true, unique: true },
  organizerId: { type: Number, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String] },
  isTrending: { type: Boolean, default: false },
  price: { type: Number },
  city: { type: String },
  capacity: { type: Number },
  language: { type: String },
  category: { type: String },
  eventType:{ type: String},
  foodArrangement: { type: String },
  utilities: { type: String },
  thingsToCarry: { type: String },
  waterAvailability: { type: Boolean },
  parkingInfo: { type: String },
  imageUrl: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
