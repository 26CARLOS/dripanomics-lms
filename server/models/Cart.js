const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        courseId: String,
        title: String,
        price: Number,
        instructorId: String,
        instructorName: String,
        courseImage: String
    }],
    total: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Cart', CartSchema);