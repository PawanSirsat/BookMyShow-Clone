const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, ref: 'User' },
  message: { type: String, required: true },
  readStatus: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
