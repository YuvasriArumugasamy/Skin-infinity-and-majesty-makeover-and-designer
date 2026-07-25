const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET All Messages (admin)
router.get('/', async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

// POST Submit Contact Message
router.post('/', async (req, res) => {
  const { fullName, phone, email, subject, message } = req.body;
  if (!fullName || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }
  try {
    const created = await Contact.create({
      fullName,
      phone,
      email: email || '',
      subject: subject || 'General Inquiry',
      message,
      readStatus: false
    });
    return res.status(201).json({ success: true, message: 'Message sent successfully! We will contact you soon.', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// PATCH Mark as Read (admin)
router.patch('/:id/read', async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { readStatus: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Marked as read', data: msg });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update read status' });
  }
});

// DELETE Message (admin)
router.delete('/:id', async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete message' });
  }
});

module.exports = router;
