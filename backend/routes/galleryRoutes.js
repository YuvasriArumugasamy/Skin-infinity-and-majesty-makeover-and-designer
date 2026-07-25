const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protectAdmin } = require('../middleware/authMiddleware');

// Default gallery items (seed if empty)
const defaultItems = [
  { title: 'Luxury Bridal Makeover', category: 'Bridal', image: '/bride1.webp', status: 'Published' },
  { title: 'Royal South Indian Bride', category: 'Bridal', image: '/bride2.webp', status: 'Published' },
  { title: 'Advance Hydra Facial', category: 'Skin Care', image: '/advance hydrs facial.webp', status: 'Published' },
  { title: 'Skin Lightening & Chemical Peel', category: 'Skin Care', image: '/skin lightening chemical peeling.webp', status: 'Published' },
  { title: 'Radiant Skin Rejuvenation', category: 'Skin Care', image: '/facial.webp', status: 'Published' },
  { title: 'Botanical Hair Spa Therapy', category: 'Hair Care', image: '/hair spa.webp', status: 'Published' },
  { title: 'Handcrafted Aari Work Blouse', category: 'Designer Services', image: '/ari work.webp', status: 'Published' },
  { title: 'Precision Machine Embroidery', category: 'Designer Services', image: '/Machine embroider work.webp', status: 'Published' },
  { title: 'Designer Bridal Blouse Work', category: 'Designer Services', image: '/blouse.webp', status: 'Published' },
  { title: 'Royal Embroidery Blouse Design', category: 'Designer Services', image: '/blouse1.webp', status: 'Published' },
  { title: 'Microblading & Brow Design', category: 'Beauty Care', image: '/microblading.webp', status: 'Published' },
  { title: 'Luxury Manicure & Pedicure', category: 'Beauty Care', image: '/manicure & pedicure.webp', status: 'Published' },
  { title: 'Skin Infinity Studio', category: 'Salon Interior', image: '/shop1.webp', status: 'Published' },
  { title: 'Majesty Designer Lounge', category: 'Salon Interior', image: '/shop3.webp', status: 'Published' }
];

// GET Published Gallery (Public Website)
router.get('/', async (req, res) => {
  try {
    let list = await Gallery.find({ status: 'Published' }).sort({ createdAt: -1 });
    if (list.length === 0) {
      await Gallery.insertMany(defaultItems);
      list = await Gallery.find({ status: 'Published' }).sort({ createdAt: -1 });
    }
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.json({ success: true, data: defaultItems });
  }
});

// GET All Gallery (Admin Protected)
router.get('/all', protectAdmin, async (req, res) => {
  try {
    let list = await Gallery.find().sort({ createdAt: -1 });
    if (list.length === 0) {
      await Gallery.insertMany(defaultItems);
      list = await Gallery.find().sort({ createdAt: -1 });
    }
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.json({ success: true, data: defaultItems });
  }
});

// POST Add Gallery Item (Admin Protected)
router.post('/', protectAdmin, async (req, res) => {
  const { title, category, image, status } = req.body;
  if (!title || !category || !image) {
    return res.status(400).json({ success: false, message: 'Title, category and image are required' });
  }
  try {
    const created = await Gallery.create({ title, category, image, status: status || 'Published' });
    return res.status(201).json({ success: true, message: 'Gallery item added', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to add gallery item' });
  }
});

// PATCH Toggle Status (Admin Protected)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    return res.json({ success: true, message: 'Status updated', data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// DELETE Gallery Item (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    return res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete item' });
  }
});

module.exports = router;
