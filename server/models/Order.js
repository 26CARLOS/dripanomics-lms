const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userEmail: String,
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    orderDate : Date,
    paymentId: String,
    payerId : String,
    instructorId : String,
    instructorName : String,
    courseImage: String,
    courseTitle: String,
    courseId: String,
    coursePricing: String,
    cartItems: [
        {
            courseId: String,
            courseTitle: String,
            courseImage: String,
            coursePricing: String,
            instructorId: String,
            instructorName: String
        }
    ]
})

module.exports = mongoose.model('Order', OrderSchema);