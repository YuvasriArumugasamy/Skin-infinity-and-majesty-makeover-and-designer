const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET All Messages (Admin Protected)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// POST Submit Contact Message (Public)
router.post('/', async (req, res) => {
  const { fullName, phone, email, subject, message } = req.body;
  if (!fullName || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }

  const phoneClean = String(phone).replace(/\D/g, '');
  if (phoneClean.length < 10) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit phone number' });
  }

  try {
    const created = await Contact.create({
      fullName: String(fullName).trim(),
      phone: phoneClean,
      email: email ? String(email).trim().toLowerCase() : '',
      subject: subject ? String(subject).trim().slice(0, 100) : 'General Inquiry',
      message: String(message).trim().slice(0, 1000),
      readStatus: false
    });
    return res.status(201).json({ success: true, message: 'Message sent successfully! We will contact you soon.', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// PATCH Mark as Read (Admin Protected)
router.patch('/:id/read', protectAdmin, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { readStatus: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Marked as read', data: msg });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update read status' });
  }
});

// DELETE Message (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

module.exports = router;
