import { motion } from "framer-motion"
import { XCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function PaymentCancelPage() {
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
                <XCircle className="w-16 h-16 text-red-500" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl text-center">Payment Cancelled</CardTitle>
            <CardDescription className="text-center">
              Your payment has been cancelled. No charges have been made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-600">
              <p>
                If you experienced any issues during the payment process, please don't hesitate to contact our support
                team.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/cart">
              <Button className="mr-2">Try Again</Button>
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

export default PaymentCancelPage;