const mongoose = require("mongoose");

const plateSchema = new mongoose.Schema({
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
    stock: Number,
});

module.exports = mongoose.model("Plate", plateSchema);
