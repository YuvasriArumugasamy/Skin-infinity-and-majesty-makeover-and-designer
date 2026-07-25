const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('./config/firebase');


const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();

// CORS — only allow frontend URL
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://skininfinityandmajesty.com',
  'https://www.skininfinityandmajesty.com'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS: Not allowed'));
    }
  },
  credentials: true
}));

// Rate Limiting — Login page: max 10 attempts per 15 mins
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// General API rate limit — 100 req per 10 mins
const generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests. Please slow down.' }
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use('/api', generalLimiter);

// API Routes
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Skin Infinity & Majesty API is operational', timestamp: new Date() });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
