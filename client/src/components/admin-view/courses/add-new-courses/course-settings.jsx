import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {InstructorContext} from "@/context/instructor-context"
import {mediaUploadService} from "@/services"
import MediaProgressBar from "@/components/media-progress-bar"
import { useContext } from "react";

function CourseSettings() {
    const { 
        courseLandingFormData, 
        setCourseLandingFormData,        
        mediaUploadProgress, 
        setMediaUploadProgress,
        mediaUploadProgessPercentage, 
        setMediaUploadProgressPercentage  
    } = useContext(InstructorContext);

    async function handleImageUploadChange(event) {
        const selectedImage = event.target.files[0];

        if(selectedImage) {
            const imageFormData = new FormData();
            imageFormData.append('file', selectedImage);
            
            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage);

                if(response.success) {
                    setCourseLandingFormData({
                        ...courseLandingFormData,
                        image: response.data.url
                    });
                }
            } catch(error) {
                console.error('Image upload error:', error);
            } finally {
                setMediaUploadProgress(false);
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <div className="p-4">
                {mediaUploadProgress && (
                    <MediaProgressBar
                        isMediaUploading={mediaUploadProgress}
                        progress={mediaUploadProgessPercentage} 
                    />
                )}
            </div>

            <CardContent>
                {courseLandingFormData?.image ? (
                    <div className="flex flex-col items-center">
                        <img 
                            src={courseLandingFormData.image} 
                            alt="course" 
                            className="w-1/2 h-1/2 mb-4" 
                        />
                        <Button 
                            variant="destructive" 
                            onClick={() => document.getElementById('courseImage').click()}
                        >
                            Replace Image
                        </Button>
                        <Input 
                            id="courseImage"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUploadChange}
                        />
                    </div>
                ) : (
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
                )}
            </CardContent>
        </Card>
    );
}

export default CourseSettings;
