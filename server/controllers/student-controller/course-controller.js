

const Course = require('../../models/Course');
const getAllStudentCourses = async (req, res) => {

    try {
        const courses = await Course.find();
        
        if(courses.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No courses found',
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: 'Courses retrieved successfully',
            data: courses
        })

    } catch (error) {
        res.status(500).json({
            success: false,
             message: error.message 
            });
    }
}

const getCourseDetails = async (req, res) => {

    try {

        const {id} = req.params;
        const courseDetails = await Course.findById(id);

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Course not found',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Course details retrieved successfully',
            data: courseDetails
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
             message: error.message 
            });
    }
}

module.exports = {getAllStudentCourses, getCourseDetails};