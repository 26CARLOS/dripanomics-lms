const mongoose = require('mongoose');

// Create the schema
const StudentCoursesSchema = new mongoose.Schema({
    userId: String,
    courses: [
        {
            courseId: String,
            title: String,
            instructorId: String,
            instructorName: String,
            dateOfPurchase: Date,
            courseImage: String
        }
    ]
});

// Export the model only if it hasn't been compiled yet
module.exports = mongoose.models.StudentCourses || mongoose.model('StudentCourses', StudentCoursesSchema);