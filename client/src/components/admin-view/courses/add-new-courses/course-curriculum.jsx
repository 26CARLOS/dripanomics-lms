import React, { useContext, useRef } from 'react';
import { InstructorContext } from '@/context/instructor-context';
import FormControls from '@/components/common-form/form-controls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseCurriculumFormControls, courseCurriculumInitialFormData } from '@/config';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { mediaUploadService, mediaDeleteService, mediaBulkUploadService } from '@/services';
import MediaProgressBar from '@/components/media-progress-bar';
import VideoPlayer from '@/components/video-player';
import { Upload } from 'lucide-react';

function CourseCurriculum() {
    const {courseCurriculumFormData, 
        setCourseCurriculumFormData, 
        mediaUploadProgress, 
        setMediaUploadProgress,
        mediaUploadProgessPercentage, 
        setMediaUploadProgressPercentage  
     } = useContext(InstructorContext);

     const bulkUploadInputRef = useRef(null);

    function handleNewLecture() {
        setCourseCurriculumFormData([
            ...courseCurriculumFormData, 
            {
                ...courseCurriculumInitialFormData[0]
            }]);

        console.log(courseCurriculumFormData);
    }

    function handlCourseTitleChange(event, index){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[index] = {
            ...cpyCourseCurriculumFormData[index],
            title: event.target.value
        };

        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
    console.log(courseCurriculumFormData);
    
    function handleFreePreviewChange(value, index){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[index] = {
            ...cpyCourseCurriculumFormData[index],
            freePreview: value
        };

        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

    async function handleSingleLectureUpload(event, index) {
        console.log(event.target.files);
    
        const selectedFiles = event.target.files[0];
    
        if (selectedFiles) {
            const videoFormData = new FormData();
            videoFormData.append('file', selectedFiles);
    
            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
    
                if (response.success) {
                    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
                    cpyCourseCurriculumFormData[index] = {
                        ...cpyCourseCurriculumFormData[index],
                        videoUrl: response.data.secure_url, // Make sure this matches the cloudinary response
                        public_id: response.data.public_id
                    };
                    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
                }
            } catch (error) {
                console.error('Upload error:', error);
            } finally {
                setMediaUploadProgress(false);
            }
        }
    }

    function isCourseCurriculumFormDataValid(){
        return courseCurriculumFormData.every(item => {
            return (item && typeof item ==="object" && 
            item.title.trim() !== "" && 
            item.videoUrl.trim() !=="")
        });
    }

    async function handleReplaceVideo(index){
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        const videoPublicID = cpyCourseCurriculumFormData[index].public_id;
        const deleteCurrentMediaResponse = await mediaDeleteService(videoPublicID);

        console.log(deleteCurrentMediaResponse, )

        if(deleteCurrentMediaResponse?.success){
            cpyCourseCurriculumFormData[index] = {  
            ...cpyCourseCurriculumFormData[index],
            videoUrl:'',
            public_id:''
        }
            setCourseCurriculumFormData(cpyCourseCurriculumFormData);
        }
    }

    function areAllCoursesEmpty(arr){
        return arr.every(item => {
            return Object.entries(item).every(([key, value]) => {
                if(typeof value === "boolean"){
                    return true;
                }
                return value.trim() === "";
            })
        })
    }

    function handleBulkUploadDialog(){
        bulkUploadInputRef.current?.click();
    }

    async function handleBulkUpload(event) {
        const selectedFiles = Array.from(event.target.files);
        const bulkFormData = new FormData();
      
        selectedFiles.forEach(file => {
          bulkFormData.append('files', file);
        });
      
        try {
          setMediaUploadProgress(true);
          const response = await mediaBulkUploadService(bulkFormData, setMediaUploadProgressPercentage);
          console.log(response,"response");
          if(response?.success){
            let cpyCourseCurriculumFormData = areAllCoursesEmpty(courseCurriculumFormData) ? 
            [] : [...courseCurriculumFormData];

            cpyCourseCurriculumFormData =[
                ...cpyCourseCurriculumFormData,
                ...response?.data.map((item, index )=> ({
                    videoUrl: item?.secure_url,
                    public_id: item?.public_id,
                    title: `Lecture ${cpyCourseCurriculumFormData.length + index+1}`,
                    freePreview: false
                }))
            ]
            setCourseCurriculumFormData(cpyCourseCurriculumFormData);           
            
        } }catch (error) {
          console.log(error, "error bulk uploading");
        } finally {
          setMediaUploadProgress(false);
        }
      }

async function handleDeleteLecture(index) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const videoPublicID = cpyCourseCurriculumFormData[index].public_id;
    const deleteCurrentMediaResponse = await mediaDeleteService(videoPublicID);


    if(deleteCurrentMediaResponse?.success){
        cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter((_, i) => i !== index);
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }
    
}

        
    return ( 
        <Card>
            <CardHeader className="flex flex-row justify-between ">
                <CardTitle>Create Course Curriculum</CardTitle>
                <div>
                    <Input
                    type="file"
                    ref={bulkUploadInputRef}
                    accept="video/*"
                    multiple
                    className="hidden"
                    id="bulk-media-upload"
                    onChange={handleBulkUpload}
                    />
                    <Button
                    as="label"
                    htmlFor="bulk-media-upload"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleBulkUploadDialog}
                    >
                        <Upload className='w-6 h-6 mr-2'/>
                        Bulk Upload
                    </Button>
                </div>

            </CardHeader>
            <CardContent>
                <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
                {/* <FormControls
                formControls={courseCurriculumFormControls}
                formData={courseCurriculumFormData}
                setFormData={setCourseCurriculumFormData}
                /> */}
                
                {  
                    mediaUploadProgress ? 
                    <MediaProgressBar
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgessPercentage} 
                    />: null
                }

                
                <div className="mt-4 space-y-4">
                    {
                        courseCurriculumFormData.map((curriculumItem, index) => 
                            <div className="border p-5 rounded-md" key={index}>
                                <div className="flex gap-5 items-center">
                                    <h3 className='font-semibold'> Lecture {index+1}</h3>
                                    <Input 
                                    name={`title-${index+1}`}
                                    placeholder="Enter Lecture title"
                                    className="max-w-96"
                                    onChange={(event) => {handlCourseTitleChange(event, index)}}
                                    value={courseCurriculumFormData[index]?.title}
                                    />
                                    <div className='flex items-center space-x-2'>
                                    <Switch
                                        id={`freePreview-${index}`}
                                        checked={curriculumItem.freePreview}
                                        onCheckedChange={(checked) => {
                                            const updatedData = [...courseCurriculumFormData];
                                            updatedData[index].freePreview = checked;
                                            setCourseCurriculumFormData(updatedData);
                                        }}
                                    />
                                        <Label htmlFor={`freePreview-${index+1}`}>Free Preview</Label>
                                    </div>
                                </div>
                                {
                                courseCurriculumFormData[index]?.videoUrl ? (
                                    <div className='flex gap-3'>
                                        <VideoPlayer 
                                            url={courseCurriculumFormData[index].videoUrl}
                                            width="450px"
                                            height="200px"
                                        />
                                        <Button onClick={() => handleReplaceVideo(index)}>Replace Video</Button>
                                        <Button onClick={()=>handleDeleteLecture(index)} className='bg-red-600'>Delete Lecture</Button>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <Input
                                            type="file"
                                            accept="video/*"
                                            onChange={(event) => handleSingleLectureUpload(event, index)}
                                            className="mb-4"
                                        />
                                    </div>
                                )
                            }

                            </div>
                        )
                    }
                </div>
            </CardContent>
        </Card>
 );
}

export default CourseCurriculum;