const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'big'],
        required: true
    },
    img: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        default: ''
    },
        stock: {
        type: Number,
        required: true,
        min: 0
    },
    category :{
        type : String,
        required : true,
        enum : ["Pot","Mug","Plate"]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductU2', productSchema);
