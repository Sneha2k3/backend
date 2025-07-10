// models/CustomProduct.js
const mongoose = require('mongoose');

const customProductSchema = new mongoose.Schema({
  image: {
    filename: { type: String, required: true },          
    originalName: { type: String, required: true },     
    mimeType: { type: String, required: true },          
    url: { type: String, required: true },                
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  name: {
    type: String,
    default: 'Custom Product',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('CustomProduct', customProductSchema);
