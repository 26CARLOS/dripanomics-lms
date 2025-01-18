const express = require('express');
const { addNewCourse, 
    updateCourseByID, 
    getCourseDetailsByID, 
    getAllCourses}
= require('../../controllers/admin-controller/course-controller')

const router = express.Router();

router.post('/add', addNewCourse);
router.get('/get', getAllCourses);
router.get('/get/details/:id', getCourseDetailsByID);
router.put('/update/:id', updateCourseByID)


module.exports = router;