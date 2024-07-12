const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: Number, required: true, unique: true },
  eventId: { type: Number, required: true, ref: 'Event' },
  userId: { type: Number, required: true, ref: 'User' },
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
