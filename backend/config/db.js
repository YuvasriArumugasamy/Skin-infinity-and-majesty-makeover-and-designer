const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skin_infinity_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Non-blocking exit for demo fallback if local mongodb is not running
    console.log('Running in decoupled/fallback backend mode if database connection is pending.');
  }
};

module.exports = connectDB;
