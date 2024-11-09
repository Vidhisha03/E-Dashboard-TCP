const mongoose = require('mongoose');
// Use environment variable for the MongoDB URI in production
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
