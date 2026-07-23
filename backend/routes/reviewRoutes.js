const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

let memoryReviews = [
  {
    _id: 'rev-1',
    customerName: 'Priya M.',
    email: 'priya@example.com',
    service: 'Facial & Hydra Facial',
    rating: 5,
    reviewText: 'Amazing experience! The facial made my skin glow and feel so fresh. The staff is very friendly and professional.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    status: 'Approved',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'rev-2',
    customerName: 'Anjali R.',
    email: 'anjali@example.com',
    service: 'Bridal Makeup',
    rating: 5,
    reviewText: 'I got my bridal makeup done here and it was perfect! Everyone appreciated my look. Thank you Skin Infinity & Majesty team!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    status: 'Approved',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'rev-3',
    customerName: 'Meena S.',
    email: 'meena@example.com',
    service: 'Hair Spa & Manicure',
    rating: 5,
    reviewText: 'Best hair spa experience ever! My hair feels so smooth and healthy. Highly recommended salon in Tirunelveli!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    status: 'Approved',
    createdAt: new Date().toISOString()
  }
];

router.get('/', async (req, res) => {
  try {
    const list = await Review.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list.length ? list : memoryReviews });
  } catch (err) {
    return res.json({ success: true, data: memoryReviews });
  }
});

router.post('/', async (req, res) => {
  const { customerName, email, service, rating, reviewText } = req.body;
  if (!customerName || !service || !rating || !reviewText) {
    return res.status(400).json({ success: false, message: 'Missing required review fields' });
  }
  const newRev = {
    _id: 'rev-' + Date.now(),
    customerName,
    email: email || '',
    service,
    rating: Number(rating),
    reviewText,
    avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  try {
    const created = await Review.create(newRev);
    memoryReviews.unshift(created);
    return res.status(201).json({ success: true, message: 'Review submitted successfully! Pending admin approval.', data: created });
  } catch (err) {
    memoryReviews.unshift(newRev);
    return res.status(201).json({ success: true, message: 'Review submitted successfully! Pending admin approval.', data: newRev });
  }
});

router.patch('/:id/approve', async (req, res) => {
  const { status } = req.body;
  const target = memoryReviews.find(r => r._id === req.params.id);
  if (target) {
    target.status = status || 'Approved';
    return res.json({ success: true, message: `Review status changed to ${target.status}`, data: target });
  }
  return res.status(404).json({ success: false, message: 'Review not found' });
});

module.exports = router;
