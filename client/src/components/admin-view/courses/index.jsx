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
              <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
                <CardTitle className="text-2xl md:text-3xl font-extrabold">
                  All Courses
                </CardTitle>
                <Button onClick={() => navigate('/admin/create-new-course')}>
                  Create New Course
                </Button>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px] min-w-[200px]">Courses</TableHead>
                        <TableHead className="min-w-[100px]">Students</TableHead>
                        <TableHead className="min-w-[100px]">Revenue</TableHead>
                        <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {coursesList?.map(course => (
                        <TableRow key={course._id}>
                          <TableCell className="font-medium break-words">
                            {course?.title}
                          </TableCell>
                          <TableCell>{course?.students?.length}</TableCell>
                          <TableCell>
                            R{course?.pricing * course?.students?.length}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                                variant="ghost" 
                                size="sm"
                              >
                                <Edit className="h-5 w-5"/>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-5 w-5"/>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          );
}

export default AdminCourses;