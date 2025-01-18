import { CardTitle, CardHeader, Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Edit, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { courseCurriculumInitialFormData, CourseLandingInitialFormData } from "@/config";

function AdminCourses({coursesList}) {
    const navigate = useNavigate();

    const {currentEditedCourseId, 
        setCurrentEditedCourseId,
        setCourseLandingFormData,
        setCourseCurriculumFormData
        } = useContext(InstructorContext);

    return ( 
    <Card className="w-full flex flex-col"> 
        <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle className="text-3xl font-extrabold">
                All Courses
            </CardTitle>
            <Button onClick={() => {
                    setCurrentEditedCourseId(null);
                    navigate('/admin/create-new-course')
                    setCourseCurriculumFormData(courseCurriculumInitialFormData)
                    setCourseLandingFormData(CourseLandingInitialFormData)}} >
                Create New Course
            </Button>
        </CardHeader>
        <CardContent className=" overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Courses</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        coursesList && coursesList.length > 0 ? 
                        coursesList?.map(course=>
                            <TableRow key={course._id}>
                            <TableCell className="font-medium">{course?.title}</TableCell>
                            <TableCell>{course?.students?.length}</TableCell>
                            <TableCell>R{course?.pricing * course?.students?.length}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={()=>{
                                    navigate(`/admin/edit-course/${course._id}`)
                                }} variant = "ghost" size="sm" >
                                    <Edit  className="h-5 w-5"/>
                                </Button>
                                <Button variant = "ghost" size="sm" >
                                    <Trash className="h-5 w-5"/>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ) : null
                    }

                </TableBody>
            </Table>
        </CardContent>
    </Card> );
}

export default AdminCourses;