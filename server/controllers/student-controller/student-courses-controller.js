const StudentCourses = require("../../models/studentCourses");


const getCoursesByStudentId = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        const studentPurchasedCourses= await StudentCourses.findOne(
            { 
                userId: studentId 
            });
        if(!studentPurchasedCourses){
            return res.status(404).json({
                success: false,
                message: 'No courses found!'
            });
        }
        res.status(200).json({
            success: true,
            data: studentPurchasedCourses.courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        });
    }
}

module.exports = {getCoursesByStudentId};