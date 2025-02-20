const express = require('express');
const { addNewCourse, 
    updateCourseByID, 
    getCourseDetailsByID, 
    getAllCourses,
    searchCourses    
}
= require('../../controllers/admin-controller/course-controller')

const router = express.Router();

router.post('/add', addNewCourse);
router.get('/get', getAllCourses);
router.get('/get/details/:id', getCourseDetailsByID);
router.put('/update/:id', updateCourseByID);
router.get('/search', searchCourses);  


module.exports = router;