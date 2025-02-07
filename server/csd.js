// In server/scripts/clear-student-data.js

const mongoose = require('mongoose');
const StudentCourses = require('./models/StudentCourses');
const Course = require('./models/Course');
require('dotenv').config();

async function clearStudentData() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://carlosjuma821:wpWA5ykyyeZoKMAb@cluster0.ovw1j.mongodb.net/");
        console.log('Connected to MongoDB');

        // Delete all student courses
        const deleteStudentCourses = await StudentCourses.deleteMany({});
        console.log('Deleted StudentCourses:', deleteStudentCourses.deletedCount);

        // Clear students array from all courses
        const updateCourses = await Course.updateMany(
            {}, 
            { $set: { students: [] } }
        );
        console.log('Updated Courses:', updateCourses.modifiedCount);

        console.log('Successfully cleared all student data');
    } catch (error) {
        console.error('Error clearing student data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

clearStudentData();