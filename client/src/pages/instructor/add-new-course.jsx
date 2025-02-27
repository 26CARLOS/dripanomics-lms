import CourseCurriculum from "@/components/admin-view/courses/add-new-courses/course-curriculum";
import CourseLandingPage from "@/components/admin-view/courses/add-new-courses/course-landing-page";
import CourseSettings from "@/components/admin-view/courses/add-new-courses/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList,TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {InstructorContext} from "@/context/instructor-context";
import {AuthContext} from "@/context/auth-context";
import { useContext, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"
import {addNewCourseService, fetchAdminCourseDetailsService, updateCourseByIdService} from "@/services"
import {CourseLandingInitialFormData, courseCurriculumInitialFormData} from "@/config"


function AddNewCoursePage() {

    const {courseLandingFormData, 
        courseCurriculumFormData,
        setCourseLandingFormData,
        setCourseCurriculumFormData,
        currentEditedCourseId, 
        setCurrentEditedCourseId
        } = useContext(InstructorContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    console.log(params, "params")
        
    function isEmpty(value){
        if(Array.isArray(value)){
            return value.length === 0
        }
        return value ==="" || value===null || value===undefined

    }

    function validateForm(){
        console.log('Landing Form Data:', courseLandingFormData);
        console.log('Curriculum Form Data:', courseCurriculumFormData);
        
        // Check landing page data
        for(const key in courseLandingFormData){
            if(isEmpty(courseLandingFormData[key])){
                console.log('Empty landing page field:', key);
                return false;
            }
        }
    
        let hasFreepreview = false;
    
        // Check curriculum data
        for(const item of courseCurriculumFormData){
            if(isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)){
                console.log('Empty curriculum field:', item);
                return false;
            }
    
            if(item.freePreview){
                hasFreepreview = true;
            }
        }
    
        console.log('Has free preview:', hasFreepreview);
        return hasFreepreview;
    }

    async function handleCreateCourse(){

        const courseData = {
            instructorId: auth?.user?._id,
            InstructorName: auth?.user?.userName,
            
            title: courseLandingFormData.courseName,
            category: courseLandingFormData.Category,
            level: courseLandingFormData.level,
            language: courseLandingFormData.primarylanguage,
            subtitle: courseLandingFormData.subTitle,
            description: courseLandingFormData.description,
            image: courseLandingFormData.image,
            welcomeMessage: courseLandingFormData.welcomemessage,
            pricing: Number(courseLandingFormData.pricing),
            objectives: courseLandingFormData.objectives,
            
            students: [],
            curriculum: courseCurriculumFormData,
            isPublished: true,
            date: new Date()
        };
        const response =
        currentEditedCourseId !== null ? await updateCourseByIdService(currentEditedCourseId, courseData) : await addNewCourseService(courseData)
        if(response?.success){
            setCourseLandingFormData(CourseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData)
            setCurrentEditedCourseId(null);
            navigate(-1);
        }

    }

    async function fetchCurrentCourseDetails(){
        const response = await fetchAdminCourseDetailsService(currentEditedCourseId);
        console.log(response)

        if(response?.success){
            const courseDetails = response?.data;
            setCourseLandingFormData({
                courseName: courseDetails.title,
                Category: courseDetails.category,
                level: courseDetails.level,
                primarylanguage: courseDetails.language,
                subTitle: courseDetails.subtitle,
                description: courseDetails.description,
                image: courseDetails.image,
                welcomemessage: courseDetails.welcomeMessage,
                pricing: courseDetails.pricing,
                objectives: courseDetails.objectives
            })

            setCourseCurriculumFormData(courseDetails.curriculum)
        }


    }
    useEffect(() =>{
            if(params?.id){
                setCurrentEditedCourseId(params.id)
            }

        },[params?.id])

    useEffect(()=>{
        if(currentEditedCourseId !== null){
            fetchCurrentCourseDetails(currentEditedCourseId)
        }
    },[currentEditedCourseId])

    

    return ( 
        <div className="container mx-auto p-4">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold mb-5">{currentEditedCourseId ? "Edit Course":"Create a new course"}</h1>
                <Button 
                disabled={!validateForm()} 
                className="text-sm trackin-wider font-bold px-8"
                onClick={handleCreateCourse}
                >
                    SUBMIT
                </Button>
            </div>
            <Card>
                    <CardContent >
                        <div className="Ccontainer mx-auto px-4">
                            <Tabs defaultValue="curriculum" className="space-y-4">
                                <TabsList>
                                    <TabsTrigger value="curriculum">
                                        Curriculum
                                    </TabsTrigger>
                                    <TabsTrigger value="course-landing-page">
                                        Course Landing Page
                                    </TabsTrigger>
                                    <TabsTrigger value="settings">
                                        Settings
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="curriculum">
                                    <CourseCurriculum/>
                                </TabsContent>

                                <TabsContent value="course-landing-page">
                                    <CourseLandingPage/>
                                </TabsContent>
                                    
                                <TabsContent value="settings">
                                    <CourseSettings/>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </CardContent>
                </Card>
        </div>
     );
}

export default AddNewCoursePage;