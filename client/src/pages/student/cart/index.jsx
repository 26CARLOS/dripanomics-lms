import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth-context';
import { getCartService, removeFromCartService, createPaymentService, createCartPaymentService } from '@/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentContext } from "@/context/student-context";
import BackButton from '@/components/student-view/back-button';

function CartPage() {
  const { auth } = useContext(AuthContext);
  const {cartCount, setCartCount} = useContext(StudentContext);
  const [cart, setCart] = useState(null);

  async function fetchCart() {
    try {
      const response = await getCartService(auth?.user?._id);
      if (response.success) {
        console.log(response)
        setCart(response.data);
        setCartCount(response.data.items.length);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  async function handleRemoveFromCart(courseId) {
    try {
      const response = await removeFromCartService(auth?.user?._id, courseId);
      if (response.success) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }

  async function handleCheckout() {
    try {
      const paymentPayload = {
        userId: auth?.user?._id,
        userName: auth?.user?.userName,
        userEmail: auth?.user?.userEmail,
        cartItems: cart.items,
        total:Number( cart.total.toFixed(2))
      };

      const response = await createCartPaymentService(paymentPayload);
      if (response?.success) {
        
        window.location.href = response.data.payfastUrl;
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      </div>
      
      {cart?.items?.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <Card key={item.courseId}>
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.courseImage} 
                      alt={item.title} 
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p>By {item.instructorName}</p>
                      <p className="font-bold">R{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRemoveFromCart(item.courseId)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: R{cart.total.toFixed(2)}
            </div>
            <Button onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default CartPage;