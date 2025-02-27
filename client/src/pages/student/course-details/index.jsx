
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import { StudentContext } from '../../../context/student-context';
import { fetchAdminCourseDetailsService } from '@/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PlayCircle,Lock,Globe } from 'lucide-react';
import VideoPlayer from '@/components/video-player';

function SudentCourseDetials () {

    const {
        studentViewCourseDetials, 
        setStudentViewCourseDetials, 
        currentCourseId, 
        setCurrentCourseId,
        loading,
        setLoading
    } = useContext(StudentContext);

    const [displayCurrentFreePreview, setDisplayCurrentFreePreview] = useState(null);
    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

    const {id} = useParams();
    
    const location = useLocation();

    async function fetchAdminCourseDetails(courseId) {
        const response = await fetchAdminCourseDetailsService(courseId);
        console.log('response', response);

        if(response?.success) {
            setStudentViewCourseDetials(response.data);
            setLoading(false);
        }
        
    }

    function handleSetFreePreview(getCurrentVideoDetails) {
        console.log('getCurrentVideoDetails', getCurrentVideoDetails);
        setDisplayCurrentFreePreview(getCurrentVideoDetails?.videoUrl);
        setShowFreePreviewDialog(true);
    }

    // useEffect(()=>{
    //     if(displayCurrentFreePreview!== null){
    //         setShowFreePreviewDialog(true);
    //     }
    // },[displayCurrentFreePreview])

    useEffect(() => {
        if(currentCourseId) {
            fetchAdminCourseDetails(currentCourseId);
        }
    },[currentCourseId])

    useEffect(() => {
        if(id) {
            setCurrentCourseId(id);
        }
    },[id]);

    useEffect(() => {
        if(!location.pathname.includes('/course/details')) {
            setStudentViewCourseDetials(null);
            setCurrentCourseId(null);
            setLoading(true);
        }
    },[location.pathname]);
    
    if (loading) {
        return <LoadingSkeleton />
      }
    
      if (!studentViewCourseDetials) {
        return <div className="text-center py-10">No course details found.</div>
      }

      const getFreePreviewIndex = studentViewCourseDetials !==null ? 
        studentViewCourseDetials.curriculum.findIndex((lecture) => lecture.freePreview) : null;
    
        console.log('getFreePreviewIndex', getFreePreviewIndex);
        
      return (
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <div className="bg-gray-900 text-white p-8 rounded-lg mb-4">
        <h1 className="text-3xl font-bold mb-4">
          {studentViewCourseDetials?.title}
        </h1>
        <p className="text-xl mb-4">{studentViewCourseDetials?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {studentViewCourseDetials?.InstructorName}</span>
          <span>Created On {studentViewCourseDetials?.date.split("T")[0]}</span>
        </div>
      </div>
        <div className="flex flex-col md:flex-row gap-8 w-full">
        <main className='flex-1'>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{studentViewCourseDetials.description}</p>
            </CardContent>
          </Card>
    
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Welcome Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{studentViewCourseDetials.welcomeMessage}</p>
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>
              <CardTitle>Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
                {
                studentViewCourseDetials.curriculum.map((lecture) => (
                  <li key={lecture._id} 
                  className={`flex items-center ${lecture && 
                  lecture.freePreview 
                  ? 'cursor-pointer': 
                  'cursor-not-allowed'
                  } flex item-center mb-4`} 
                  onClick={lecture?.freePreview 
                    ? () => {handleSetFreePreview(lecture)} 
                    : null}
                  >
                    
                    {lecture?.freePreview ? 
                        <PlayCircle  className="text-blue-500 mr-2 h-6 w-6" /> : <Lock className=" mr-2 h-6 w-6"/>
                    }
                    <span>{lecture.title}</span>
                  </li>
                ))
                }
            </CardContent>
          </Card>
          </main>
          <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4 h-full items-center justify-center">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getFreePreviewIndex !== -1
                      ? studentViewCourseDetials?.curriculum[
                          getFreePreviewIndex
                        ].videoUrl
                      : ""
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  R{studentViewCourseDetials?.pricing.toFixed(2)}
                </span>
              </div>
              <Button className="w-full">
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
    </div>
    <Dialog 
    open={showFreePreviewDialog} 
    onOpenChange={() => {
        setShowFreePreviewDialog(false);
        setDisplayCurrentFreePreview(null);
    }}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle>Sneak Peek</DialogTitle>
        </DialogHeader>
        <div className="aspect-video rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    displayCurrentFreePreview
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className='flex flex-col gap-2'>
                  {
                    studentViewCourseDetials?.curriculum.filter(item=>item.freePreview)
                    .map(filteredItem=>
                        <p onClick={()=>handleSetFreePreview(filteredItem)} 
                        className='cursor-pointer text-[16px] font-medium'>
                            {filteredItem.title}
                            </p>
                    )
                  }
              </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => setShowFreePreviewDialog(false)}>
                Close
            </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>    
</div>
      )
}
    
    function LoadingSkeleton() {
      return (
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="h-[300px] w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-1/3" />
                </div>
              </div>
            </CardContent>
          </Card>
    
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
    
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

export default SudentCourseDetials;