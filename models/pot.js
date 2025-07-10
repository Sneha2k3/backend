const mongoose = require("mongoose");

const potSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        img: [{ type: String, required: true }],
        description: { type: String },
        stock: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Pot", potSchema);
