const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Connection established');
});

connection.on('error', (err) => {
  console.error('Connection error:', err);
});

connection.on('disconnected', () => {
  console.log('Connection disconnected');
});
