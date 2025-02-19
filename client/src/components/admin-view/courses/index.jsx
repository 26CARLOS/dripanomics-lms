import { CardTitle, CardHeader, Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function AdminCourses({coursesList}) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(coursesList);

    console.log(coursesList);
    

    const {
        currentEditedCourseId, 
        setCurrentEditedCourseId,
        setCourseLandingFormData,
        setCourseCurriculumFormData
    } = useContext(InstructorContext);

    useEffect(() => {
        filterCourses();
    }, [searchQuery, coursesList]);

    function filterCourses() {
        if (!searchQuery) {
            setFilteredCourses(coursesList);
            return;
        }

        const filtered = coursesList.filter(course => 
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.InstructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredCourses(filtered);
    }

    return (
        <Card className="w-full flex flex-col">
            <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
                <CardTitle className="text-2xl md:text-3xl font-extrabold">
                    All Courses
                </CardTitle>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => navigate('/admin/create-new-course')}>
                        Create New Course
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <ScrollArea className="h-[600px] w-full rounded-md border">
                <div className="min-w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px] min-w-[200px]">Courses</TableHead>
                                <TableHead className="min-w-[100px]">Instructor</TableHead>
                                <TableHead className="min-w-[100px]">Category</TableHead>
                                <TableHead className="min-w-[100px]">Students</TableHead>
                                <TableHead className="min-w-[100px]">Revenue</TableHead>
                                <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCourses?.map(course => (
                                <TableRow key={course._id}>
                                    <TableCell className="font-medium break-words">
                                        {course?.title}
                                    </TableCell>
                                    <TableCell>{course?.InstructorName}</TableCell>
                                    <TableCell>{course?.category}</TableCell>
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
                <ScrollBar orientation="horizontal" />
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export default AdminCourses;