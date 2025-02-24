const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentCourses = async (req, res) => {
    try {
      const {
        category = [],
        level = [],
        primaryLanguage = [],
        sortBy = "price-lowtohigh",
      } = req.query;
  
    //   console.log(req.query, "req.query");
  
      let filters = {};
      if (category && category.length) {
        filters.category = { $in: category.split(",") };
      }
      if (level && level.length) {
        filters.level = { $in: level.split(",") };
      }
      if (primaryLanguage.length) {
        filters.primaryLanguage = { $in: primaryLanguage.split(",") };
      }
  
      let sortParam = {};
      switch (sortBy) {
        case "price-lowtohigh":
          sortParam.pricing = 1;
  
          break;
        case "price-hightolow":
          sortParam.pricing = -1;
  
          break;
        case "title-atoz":
          sortParam.title = 1;
  
          break;
        case "title-ztoa":
          sortParam.title = -1;
  
          break;
  
        default:
          sortParam.pricing = 1;
          break;
      }
    //   console.log(filters, 'controller filters');
    //   console.log(sortParam, 'controller sortParam');
    //   console.log('here');
      const coursesList = await Course.find(filters).sort(sortParam);
  
      res.status(200).json({
        success: true,
        data: coursesList,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };

const getFeaturedCourses = async (req, res) => {
  try {
    const featuredCourses = await Course.aggregate([
      { $addFields : { studentCount : {$size : "$students"}}},
      { $sort: { studentCount : -1}},
      { $limit: 10},
      { $project: {studentCount: 0}}
    ]);
    if(featuredCourses){
      res.status(200).json({
        success: true,
        message:"Featured courses retrieved successfully",
        data: featuredCourses,
      });
    }
    else{
      res.status(404).json({
        success: true,
        message:"No featured courses found",
        data: null
      })
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
};

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
            data: courseDetails,
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
             message: error.message 
            });
    }
};

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    // Check if studentCourses exists before accessing courses
    if (!studentCourses) {
      return res.status(200).json({
        success: true,
        message: 'Student has no courses yet',
        data: false
      });
    }

    const studentOwnsCourse = studentCourses.courses.findIndex(item => item.courseId === id) > -1;
    
    res.status(200).json({
      success: true,
      message: 'Course details retrieved successfully',
      data: studentOwnsCourse
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {getAllStudentCourses, 
  getCourseDetails, 
  checkCoursePurchaseInfo,
  getFeaturedCourses
};