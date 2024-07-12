const mongoose = require('mongoose');

const organizerApplicationSchema = new mongoose.Schema({
  applicationId: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date }
});

const OrganizerApplication = mongoose.model('OrganizerApplication', organizerApplicationSchema);
module.exports = OrganizerApplication;
