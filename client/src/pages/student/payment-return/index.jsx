import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentReturnPage() {
    const [status, setStatus] = useState("processing");
    const navigate = useNavigate();
    
    useEffect(() => {
        // Wait a few seconds then redirect to courses page
        const timer = setTimeout(() => {
            navigate("/my-courses");
        }, 3000);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Thank you for your purchase! Redirecting to your courses...
                </CardTitle>
            </CardHeader>
        </Card>
    );
}

export default PaymentReturnPage;