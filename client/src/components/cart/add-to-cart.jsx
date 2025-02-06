import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import {StudentContext} from '@/context/student-context'
import { addToCartService, checkCoursePurchaseInfoService, getCartService } from '@/services';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, PlusCircle, Plus } from 'lucide-react';


function AddToCart({ courseId, variant = "" }) {
    const { auth } = useContext(AuthContext);
    const {setCartCount} = useContext(StudentContext);
    const [ownsCourse, setOwnsCourse] = useState(false);
    const { toast } = useToast();
  
    async function handleAddToCart() {
      try {
        const cartData = {
          userId: auth?.user?._id,
          courseId: courseId
        };
        
        const response = await addToCartService(cartData);
        if (response.success) {
          toast({
            title: "Success",
            description: "Course added to cart",
          });

          const cart = await getCartService(auth?.user?._id);
          setCartCount(cart?.data?.items.length);
          
        }
      } catch (error) {
        toast({
          title: "Course Already Added",
          description: "could not to add course to cart",
          variant: "destructive"
        });
      }
    }

    async function OwnsCourse(){
      const response = await checkCoursePurchaseInfoService(courseId, auth?.user?._id);
      setOwnsCourse(response?.data);
    }

    useEffect(() => {
      OwnsCourse();
    },[])
    
    
    return (
      <div className={ownsCourse ? 'hidden' : 'block'}>
        <Button 
          onClick={handleAddToCart} 
          variant={variant}
          size="sm" className="text-xs sm:text-sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          <PlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </div>
      
    );
  }
  
  export default AddToCart;