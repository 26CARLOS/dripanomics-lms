import { Button } from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import banner from "/banner.jpeg"
import { courseCategories } from "@/config";
import { StudentContext } from "@/context/student-context";
import { useContext, useEffect } from "react";
import { fetchAllStudentCoursesService, getCartService, checkCoursePurchaseInfoService } from "@/services";
import { useNavigate } from "react-router-dom";
import Flip from "@/components/animated/flip";
import { useSpring, animated } from '@react-spring/web';
import { useRef, useState } from 'react';
import {AuthContext} from '@/context/auth-context'
import AddToCart from "@/components/cart/add-to-cart"
import CourseCard from "@/components/student-view/course-card";
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Hero } from "@/components/student-view/hero";
import Autoplay from "embla-carousel-autoplay";
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

    const {coursesList, setCoursesList, setCartCount} = useContext(StudentContext);
    const{auth} = useContext(AuthContext);
    const navigate = useNavigate()

    async function fetchAllStudentCourses(){
        const courses = await fetchAllStudentCoursesService();
        console.log(courses);
        if(courses?.success){
            setCoursesList(courses.data)
        }
    }

    async function handleCourseNavigate(getCurrentCourseId) {
            const response = await checkCoursePurchaseInfoService(
              getCurrentCourseId,
              auth?.user?._id
            );
    
        
            if (response?.success) {
              if (response?.data) {
               return navigate(`/course-progress/${getCurrentCourseId}`);
              } else {
                return navigate(`/course/details/${getCurrentCourseId}`);
              }
            }
          }

    async function fetchCart(){
      const cart = await getCartService(auth?.user?._id);
      if(cart?.success){
        setCartCount(cart?.data?.items?.length);
      }
    }

    useEffect(() => {
        fetchAllStudentCourses();
    },[])

    useEffect(() => {
      fetchCart();
  },[])

    return (
    <div className="min-h-screen bg-white w-full">
        <section >
            {/* <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <Flip/>
            </div>
            <div className="lg:w-full lg:mb-0 ">
            <img src={banner} 
                width={500}
                height={300}
                className="w-full h-auto rounded-lg shadow-lg " 
                alt="online tutorials banner"
            />
            </div> */}
            <Hero/>
        </section>
        <section className="bg-gray-100 py-8 px-4 lg:px-8 overflow-hidden">
            <h2 className="text-2xl text-center font-bold mb-6">Categories</h2>
            
            <div className="relative overflow-hidden py-4">
                <CategoryTrack categories={[...courseCategories, ...courseCategories]} reverse={false} />
            </div>
            

        </section>

        <section className="py-12 px-4 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Courses</h2>
            <Carousel
              plugins={[
                Autoplay({
                  delay : 4000,
                })
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
            <CarouselContent className="-ml-2 md:-ml-4">
              {coursesList.map((course) => (
                <CarouselItem key={course._id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4">
                  <CourseCard {...course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden lg:flex">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>               
        </section>
    </div>  );
}

export default StudentHomePage;