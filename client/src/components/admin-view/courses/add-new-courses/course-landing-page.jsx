import FormControls from "@/components/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseCourseLandingPageFormControls } from "@/config";
import { useContext } from "react";
import { InstructorContext } from "@/context/instructor-context";

function CourseLandingPage() {

    const {courseLandingFormData, setCourseLandingFormData} = useContext(InstructorContext);
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Course Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
                <FormControls
                formControls={courseCourseLandingPageFormControls}
                formData={courseLandingFormData}
                setFormData={setCourseLandingFormData}
                />     
            </CardContent>
        </Card>
    );
}

export default CourseLandingPage;