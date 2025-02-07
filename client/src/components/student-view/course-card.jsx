import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AddToCart from "../cart/add-to-cart";
import { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import {checkCoursePurchaseInfoService} from "@/services"
import {AuthContext} from "@/context/auth-context"

function CourseCard({ title, instructorName, image, pricing, _id }) {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    console.log(response);

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }
  
  return (
    <Card className="w-full h-full flex flex-col">
      <div onClick={() => handleCourseNavigate(_id)}>
        <img 
          src={image} 
          alt={title}
          width={300}
          height={150}
          className="w-full h-40 object-fit rounded-lg"
              />
        <CardContent className="p-2 sm:p-4 flex-grow" >
          <CardTitle className="text-sm sm:text-sm line-clamp-1 mb-1 sm:mb-2">{title}</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">{instructorName}</p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center p-2 sm:p-4">
        <span className="text-sm sm:text-lg font-bold">R{pricing.toFixed(2)}</span>
        <AddToCart courseId={_id} />
      </CardFooter>
    </Card>
  )
}

export default CourseCard;
