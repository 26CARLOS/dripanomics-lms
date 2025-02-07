import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

function PaymentReturnPage() {
    const [status, setStatus] = useState("processing");
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id");
    
    useEffect(() => {
        // Wait a few seconds then redirect to courses page
        const timer = setTimeout(() => {
            navigate("/my-courses");
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="w-16 h-16 text-green-500" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl text-center">Payment Successful!</CardTitle>
            <CardDescription className="text-center">
              Thank you for your purchase. Your transaction has been completed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-600">
              <p>Your order number is: {orderId}</p>
              <p className="mt-2">An email confirmation has been sent to your registered email address.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/order-details">
              <Button className="mr-2">Go to my courses</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
    );
}

export default PaymentReturnPage;