const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
    role : String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

module.exports = mongoose.model('User', userSchema);