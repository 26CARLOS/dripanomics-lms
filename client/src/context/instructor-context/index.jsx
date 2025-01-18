import { CourseLandingInitialFormData, courseCurriculumInitialFormData } from '@/config';
import { createContext, useState } from 'react';

  

export const InstructorContext = createContext(); 


export default function InstructorProvider({ children }) {

    const [courseLandingFormData, setCourseLandingFormData] = useState(
        CourseLandingInitialFormData
    );

    const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
        courseCurriculumInitialFormData
    );

    const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
    const [mediaUploadProgessPercentage, setMediaUploadProgressPercentage] = useState(0);

    const [adminCourseList, setAdminCourseList] = useState([])
    const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null)
    return (
        <InstructorContext.Provider value={{ 
            courseLandingFormData, 
            setCourseLandingFormData,
            courseCurriculumFormData, 
            setCourseCurriculumFormData,
            mediaUploadProgress, 
            setMediaUploadProgress,
            mediaUploadProgessPercentage, 
            setMediaUploadProgressPercentage,
            adminCourseList, 
            setAdminCourseList,
            currentEditedCourseId, 
            setCurrentEditedCourseId}}>

            {children}
        </InstructorContext.Provider>
    )
}