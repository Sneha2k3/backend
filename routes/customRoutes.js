const express = require('express');
const router = express.Router();
const upload = require('../service/upload'); 
const CustomProduct = require('../models/CustomProduct')

outer.post('/upload', (req, res) => {
    upload.single('file')(req, res, async function (err) {
      if (err) return res.status(400).json({ error: err.message });
      if (!req.file) return res.status(400).send('No file uploaded');
  
      const price = parseFloat(req.body.price);
      if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: 'Invalid price' });
      }
  
      const imageData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        url: `/uploads/${req.file.filename}`
      };
  
      try {
        const product = await CustomProduct.create({
          image: imageData,
          price
        });
  
        res.status(201).json(product);
      } catch (dbError) {
        res.status(500).json({ error: 'Failed to save product' });
      }
    });
  });
  
module.exports = router;
