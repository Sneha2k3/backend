const mongoose = require("mongoose");

const plateSchema = new mongoose.Schema({
    title: String,
    price: Number,
    size: {
        type: String,
        enum: ['small', 'medium', 'big'],
        required: true
    },
    img: [String],
    description: String,
    stock: Number,
});

module.exports = mongoose.model("Plate3", plateSchema);
