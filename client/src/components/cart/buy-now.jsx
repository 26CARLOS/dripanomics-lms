import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import {StudentContext} from '@/context/student-context'
import { addToCartService, checkCoursePurchaseInfoService, getCartService } from '@/services';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, PlusCircle, AlarmClock } from 'lucide-react';
import {useNavigate} from "react-router-dom"

function BuyNow({ courseId, courseDetails, variant = "" }) {
    const { auth } = useContext(AuthContext);
    const { toast } = useToast();
    const [ownsCourse, setOwnsCourse] = useState(false);
    
    async function handleBuyNow() {
        try {
            // Create payment payload for single item
            const paymentPayload = {
                userId: auth?.user?._id,
                userName: auth?.user?.userName,
                userEmail: auth?.user?.userEmail,
                cartItems: [{
                    courseId: courseId,
                    title: courseDetails.title,
                    price: courseDetails.pricing,
                    instructorId: courseDetails.instructorId,
                    instructorName: courseDetails.InstructorName,
                    courseImage: courseDetails.image
                }],
                total: Number(courseDetails.pricing)
            };

            const response = await createCartPaymentService(paymentPayload);
            if (response?.success) {
                window.location.href = response.data.payfastUrl;
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not process purchase",
                variant: "destructive"
            });
        }
    }

    async function OwnsCourse() {
        const response = await checkCoursePurchaseInfoService(courseId, auth?.user?._id);
        setOwnsCourse(response?.data);
    }

    useEffect(() => {
        OwnsCourse();
    }, []);
    
    return (
        <div className={ownsCourse ? 'hidden' : 'block'}>
            <Button 
                onClick={handleBuyNow} 
                variant={variant}
                size="sm" 
                className="text-xs sm:text-sm"
            >
                Buy Now
                <AlarmClock className="mr-2 h-4 w-4" />
            </Button>
        </div>
    );
}
  
  export default BuyNow;