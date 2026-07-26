const mongoose = require('mongoose');

const bridalRecordSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  functionDate: { type: String, required: true },
  eventType: { type: String, default: 'Muhurtham & Reception' },
  trialDate: { type: String },
  skinNotes: { type: String },
  jewelryColor: { type: String },
  blouseDetails: { type: String },
  bust: { type: String, default: '34"' },
  waist: { type: String, default: '28"' },
  shoulder: { type: String, default: '14"' },
  sleeve: { type: String, default: '10.5"' },
  deliveryStatus: { type: String, default: 'Consultation Completed' }
}, { timestamps: true });

module.exports = mongoose.model('BridalRecord', bridalRecordSchema);
