import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { finalizePaymentsService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function PaymentReturnPage() {

const location = useLocation();
const params = new URLSearchParams(location.search);
const payment_id = params.get('paymentId');
const payer_id = params.get('PayerID');

useEffect(()=> {

    if(payment_id && payer_id){
        async function CapturePayment() {
            const currentOrder_id = JSON.parse(sessionStorage.getItem('currentOrder_id'));
            
            const response = await finalizePaymentsService(
                currentOrder_id,
                payment_id,
                payer_id
            );

            console.log(response);
            

            if(response.success){
                sessionStorage.removeItem('currentOrder_id');
                window.location.href = '/my-courses';
            }
        }

        CapturePayment();
    }

}, [payment_id, payer_id])

console.log(params);


    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Processing Payment... Please wait.
                </CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaymentReturnPage;