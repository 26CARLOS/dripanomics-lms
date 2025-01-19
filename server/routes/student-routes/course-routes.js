const express = require('express');
const {getAllStudentCourses, getCourseDetails} = require('../../controllers/student-controller/course-controller');
const router = express.Router();


router.get('/get', getAllStudentCourses);
router.get('/get/details/:id', getCourseDetails);


module.exports = router;