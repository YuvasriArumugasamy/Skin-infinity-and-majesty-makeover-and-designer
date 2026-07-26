const express = require('express');
const router = express.Router();
const BridalRecord = require('../models/BridalRecord');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET All Bridal Records (Admin Protected)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const list = await BridalRecord.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch bridal records' });
  }
});

// POST Create Bridal Record (Admin Protected)
router.post('/', protectAdmin, async (req, res) => {
  const { 
    clientName, functionDate, eventType, trialDate, 
    skinNotes, jewelryColor, blouseDetails, 
    bust, waist, shoulder, sleeve, deliveryStatus 
  } = req.body;

  if (!clientName || !functionDate) {
    return res.status(400).json({ success: false, message: 'Client name and function date are required' });
  }

  try {
    const created = await BridalRecord.create({
      clientName: String(clientName).trim(),
      functionDate,
      eventType: eventType || 'Muhurtham & Reception',
      trialDate,
      skinNotes,
      jewelryColor,
      blouseDetails,
      bust: bust || '34"',
      waist: waist || '28"',
      shoulder: shoulder || '14"',
      sleeve: sleeve || '10.5"',
      deliveryStatus: deliveryStatus || 'Consultation Completed'
    });
    return res.status(201).json({ success: true, message: 'Bridal record created successfully', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create bridal record' });
  }
});

// DELETE Bridal Record (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const item = await BridalRecord.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Record not found' });
    return res.json({ success: true, message: 'Bridal record deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete record' });
  }
});

module.exports = router;
