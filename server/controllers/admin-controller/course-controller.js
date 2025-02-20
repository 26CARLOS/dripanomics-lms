const Course = require('../../models/Course');


const addNewCourse = async(req, res) => {
    try {
        const courseData = req.body;
        const newCourse = new Course(courseData);
        const saveCourse = await newCourse.save();

        if(saveCourse){

            res.status(201).json({
                success : true,
                message : "Course created successfully!",
                data: saveCourse
            });
        }


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
        
    }
};


const getAllCourses = async(req, res) => {
    try {

        const courses = await Course.find({});
        res.status(200).json({
            success : true,
            message : "Courses fetched successfully!",
            data: courses})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
        
    }
}

const getCourseDetailsByID = async(req, res) => {
    try {
        const {id} = req.params;
        const details = await Course.findById(id);

        if(!details){
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Found Successfully",
            data: details
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
        
    }
}

const updateCourseByID = async(req, res) => {
    try {
        const {id} = req.params;
        const courseData = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {new: true});
        
        if(!updatedCourse){
            return res.status(404).json({
                success: false,
                message: "not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
        
    }
}

const searchCourses = async(req, res) => {
    try {
        const { query } = req.query;
        
        const courses = await Course.find({
            $or: [
                { title: { $regex: query, $options: 'i' }},
                { category: { $regex: query, $options: 'i' }},
                { InstructorName: { $regex: query, $options: 'i' }}
            ]
        });

        res.status(200).json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { 
    addNewCourse, 
    updateCourseByID, 
    getCourseDetailsByID, 
    getAllCourses,
    searchCourses 
};

