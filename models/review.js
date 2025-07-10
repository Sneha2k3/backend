const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    commentTitle : String,
    comment : String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating : Number,
}, { timestamps: true });

module.exports = mongoose.model("ReviewU", reviewSchema);



