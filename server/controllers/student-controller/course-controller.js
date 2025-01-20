

const Course = require('../../models/Course');
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