import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {InstructorContext} from "@/context/instructor-context"
import {mediaUploadService} from "@/services"
import MediaProgressBar from "@/components/media-progress-bar"
import { useContext } from "react";

function CourseSettings(){

    const {courseLandingFormData, 
        setCourseLandingFormData,        
        mediaUploadProgress, 
        setMediaUploadProgress,
        mediaUploadProgessPercentage, 
        setMediaUploadProgressPercentage  
        } 
        = useContext(InstructorContext);

    async function handleImageUploadChange(event){
        const selectedImage = event.target.files[0];

        if(selectedImage){
            const imageFormData = new FormData();
            imageFormData.append('file', selectedImage)
            try{
                setMediaUploadProgress(true);
                const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage);
                console.log(response)

                if(response.success){
                    setCourseLandingFormData({
                        ...courseLandingFormData,
                        image: response.data.url
                    })
                    setMediaUploadProgress(false)
                }
            }catch(e){
                console.log(e)
            }
        }
    }

    return  (
        <Card>
            <CardHeader>
                {
                    courseLandingFormData?.image ? <CardTitle></CardTitle> : <CardTitle>Course Settings</CardTitle>
                    }
            </CardHeader>
            <div className="p-4">
            {  
                    mediaUploadProgress ? 
                    <MediaProgressBar
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgessPercentage} 
                    />: null
                }
            </div>

            <CardContent>
                {
                    courseLandingFormData?.image 
                    ? 
                    <img src={courseLandingFormData.image} alt="course" className="w-1/2 h-1/2 mb-4" /> 
                    : 
                    <div className="flex flex-col">
                    <Label className="mb-4">
                        Upload Course Image
                    </Label>
                    <Input 
                    onChange={handleImageUploadChange}
                    type="file" 
                    accept="image/*"
                    className="mb-4"
                    />
                </div>
                }

            </CardContent>
        </Card>
    )
}

export default CourseSettings;
