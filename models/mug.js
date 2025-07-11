const mongoose = require('mongoose');

const mugSchema = new mongoose.Schema({
    title: String,
    price: Number,
    size: {
        type: String,
        enum: ['small', 'medium', 'big'],
        required: true
    },
    img: [String],
    description: String,
    stock: Number
}, { timestamps: true });

module.exports = mongoose.model("Mug3", mugSchema);
