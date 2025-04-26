const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

// Check if MONGO_URL is defined
if (!MONGO_URL) {
  console.error('MONGO_URL is not defined in environment variables');
  process.exit(1); // Exit with error
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with error
  });
