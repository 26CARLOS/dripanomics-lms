import React, {useContext, useEffect} from 'react';
import {StudentContext} from '../../../context/student-context';
import { fetchStudentPurchasedCoursesService } from '@/services';
import { AuthContext } from '@/context/auth-context';
import {Button} from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Watch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function StudentCoursesPage() {
    const {auth} = useContext(AuthContext)
    const {purchasedCoursesList, setPurchasedCoursesList} = useContext(StudentContext);
    const navigate = useNavigate();
    async function fetchStudentPurchasedCourses(){
        try{
            const response = await fetchStudentPurchasedCoursesService(auth?.user._id);
            console.log(response);

            if(response.success){
                setPurchasedCoursesList(response?.data);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchStudentPurchasedCourses()
    },[])



    return (
        <div className='p-4 '>
           <h1 className='text-3xl font-bold mb-8'>My Courses</h1>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>  
                {
                    purchasedCoursesList && purchasedCoursesList.length > 0 ? 
                    purchasedCoursesList.map(course => 
                        <Card key={course.id} className='flex flex-col hover:shadow-lg m-2'>
                            <CardContent className='p-4 flex-grow'>
                                <img
                                src={course.courseImage}
                            
                                className='w-70 h-60 object-fit'
                                />
                                <h3 className='text-lg font-bold mb-1'>{course.title}</h3>
                                <p className='text-sm text-gray-700 mb-2'> by {course.instructorName}</p>
                                <CardFooter className="mt-4">
                                    <Button onClick={()=> navigate(`/course-progress/${course?.courseId}`)} className="flex-1">
                                        Start Watching
                                    </Button>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    )
                    :
                    <div>
                        <h1 className='text-3xl font-bold'>Looks empty, get a course now to get started</h1>
                        <Button onClick={() => navigate('/courses')}>Get a course</Button>
                    </div>

                }
           </div>
        </div>
    );
}

export default StudentCoursesPage;