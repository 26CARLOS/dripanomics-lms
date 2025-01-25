const express = require('express');
const {
    getAllStudentCourses, 
    getCourseDetails,
    checkCoursePurchaseInfo
} = require('../../controllers/student-controller/course-controller');
const router = express.Router();


router.get('/get', getAllStudentCourses);
router.get('/get/details/:id/', getCourseDetails);
router.get('/purchase-info/:id/:studentId', checkCoursePurchaseInfo);


module.exports = router;