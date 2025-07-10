const mongoose = require('mongoose');

const mugSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    price: Number,
    size: String,
    img: [String],
    description: String,
    stock: Number
}, { timestamps: true });

module.exports = mongoose.model("Mug", mugSchema);
