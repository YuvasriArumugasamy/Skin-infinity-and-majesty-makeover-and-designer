const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://skininfinityandmajesty.com',
  'https://www.skininfinityandmajesty.com'
];

// Create HTTP server from express app
const httpServer = http.createServer(app);

// Attach Socket.io to HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

// Make io accessible from routes via app
app.set('io', io);

// Socket.io connection handler
io.on('connection', (socket) => {
  // Admin joins admin room to receive live updates
  socket.on('join_admin', () => {
    socket.join('admin_room');
  });

  socket.on('disconnect', () => {});
});

// Connect to MongoDB
connectDB();

httpServer.listen(PORT, () => {
  console.log(`✨ Skin Infinity & Majesty Backend running on port ${PORT}`);
  console.log(`🔌 Socket.io real-time enabled`);
});
