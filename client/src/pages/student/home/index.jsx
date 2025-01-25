import { Button } from "@/components/ui/button";
import banner from "/banner.jpeg"
import { courseCategories } from "@/config";
import { StudentContext } from "@/context/student-context";
import { useContext, useEffect } from "react";
import { fetchAllStudentCoursesService } from "@/services";
import { useNavigate } from "react-router-dom";
import Flip from "@/components/animated/flip";
import { useSpring, animated } from '@react-spring/web';
import { useRef, useState } from 'react';
import {AuthContext} from '@/context/auth-context'

function CategoryTrack({ categories, reverse }) {
    const containerRef = useRef(null);
  
    const [springs, api] = useSpring(() => ({
      from: { x: 0 },
      to: async (next) => {
        while (true) {
          await next({ 
            x: reverse ? 100 : -100,
            reset: true,
            from: { x: 0 },
            config: { 
              duration: 20000,
              easing: t => t 
            }
          });
        }
      },
      config: { 
        duration: 20000,
        easing: t => t
      },
    }));
  
    return (
      <div className="relative overflow-hidden">
        <animated.div
          ref={containerRef}
          style={{
            transform: springs.x.to(x => `translateX(${x}%)`),
          }}
          className="flex whitespace-nowrap"
          onMouseEnter={() => api.pause()}
          onMouseLeave={() => api.resume()}
        >
          {[...categories, ...categories, ...categories].map((category, idx) => (
            
            <Button
              className="mx-4 flex-shrink-0"
              key={`${category.id}-${idx}`}
              variant="outline"
            >
              {category.label}
            </Button>
            
            
            
            
          ))}
        </animated.div>
      </div>
    );
  }

function StudentHomePage() {

    const {coursesList, setCoursesList} = useContext(StudentContext);
    const{auth} = useContext(AuthContext);
    const navigate = useNavigate()

    async function fetchAllStudentCourses(){
        const courses = await fetchAllStudentCoursesService();
        console.log(courses);
        if(courses?.success){
            setCoursesList(courses.data)
        }
    }

    useEffect(() => {
        fetchAllStudentCourses();
    },[])

    return (
    <div className="min-h-screen bg-white w-full ">
        <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
            <div className="lg:w-1/2 lg:pr-12 ">
            <Flip/>
            </div>
            <div className="lg:w-full mb-8 lg:mb-0">
            <img src={banner} 
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg" 
                alt="online tutorials banner"
            />
            </div>
        </section>
        <section className="bg-gray-100 py-8 px-4 lg:px-8 overflow-hidden">
            <h2 className="text-2xl text-center font-bold mb-6">Categories</h2>
            
            <div className="relative overflow-hidden py-4">
                <CategoryTrack categories={[...courseCategories, ...courseCategories]} reverse={false} />
            </div>
            

        </section>

        <section className="py-12 px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    coursesList && coursesList.length > 0 ?
                    coursesList.map(course => 
                        <div className="bg-white border rounded-lg overflow-hidden shadow-lg p-4 hover:bg-gray-100 cursor-pointer" key={course._id} onClick={() => navigate(`/course/details/${course?._id}/${auth?.user?._id}`)}>
                            <img 
                                src={course.image} 
                                alt={course.title}
                                width={300}
                                height={150}
                                className="w-full h-40 object-cover rounded-lg"
                                 />
                            <h3 className="text-lg font-bold mt-2">{course.title}</h3>
                            <p className="text-sm text-gray-600">By {course.InstructorName}</p>
                            <p className="text-md text-gray-600">{course.description}</p>
                            <p className="font-bold text-16px">R{course?.pricing.toFixed(2)}</p>
                        </div>
                ): <h1>No courses found</h1>
                }
            </div>
        </section>
    </div>  );
}

export default StudentHomePage;