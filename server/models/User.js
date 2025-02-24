const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    userName: String,
    userEmail:{ type: String, unique: true},
    password: String,
    role : String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationExpires: Date
})

module.exports = mongoose.model('User', userSchema);