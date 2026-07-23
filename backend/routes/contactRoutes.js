const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

let memoryContacts = [
  {
    _id: 'c-101',
    fullName: 'Kavya Reddy',
    phone: '06380 50488',
    email: 'kavya@gmail.com',
    subject: 'Bridal Package Inquiry',
    message: 'Hello, I want to book a bridal consultation for next month. Please share details.',
    readStatus: false,
    createdAt: new Date().toISOString()
  }
];

router.get('/', async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list.length ? list : memoryContacts });
  } catch (err) {
    return res.json({ success: true, data: memoryContacts });
  }
});

router.post('/', async (req, res) => {
  const { fullName, phone, email, subject, message } = req.body;
  if (!fullName || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields.' });
  }
  const newContact = {
    _id: 'c-' + Date.now(),
    fullName,
    phone,
    email: email || '',
    subject: subject || 'General Inquiry',
    message,
    readStatus: false,
    createdAt: new Date().toISOString()
  };
  try {
    const created = await Contact.create(newContact);
    memoryContacts.unshift(created);
    return res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.', data: created });
  } catch (err) {
    memoryContacts.unshift(newContact);
    return res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.', data: newContact });
  }
});

module.exports = router;
