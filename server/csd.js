// In server/scripts/clear-student-data.js

const mongoose = require('mongoose');
const StudentCourses = require('./models/StudentCourses');
const User = require('./models/User');
require('dotenv').config();

async function clearStudentData() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://carlosjuma821:wpWA5ykyyeZoKMAb@cluster0.ovw1j.mongodb.net/");
        console.log('Connected to MongoDB');

            await User.updateMany(
                { isVerified: { $exists: false } },
                { $set: { isVerified: true } } // Mark existing users as verified
            );
    } catch (error) {
        console.error('Error changing user data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

clearStudentData();