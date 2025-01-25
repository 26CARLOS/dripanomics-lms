const mongoose = require('mongoose');

const studentCoursesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    courses: [{
        courseId: String,
        title: String,
        instructorId: String,
        instructorName: String,
        dateOfPurchase: Date,
        courseImage: String
    }]
});

// Fix: Check if model exists before compiling
const StudentCourses = mongoose.models.StudentCourses || mongoose.model('StudentCourses', studentCoursesSchema);

module.exports = StudentCourses;