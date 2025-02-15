import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { resendVerificationEmailService } from "@/services";

function ResendVerification({ email }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleResend = async () => {
        if (!email) {
            toast({
                title: "Error",
                description: "Please enter an email address",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await resendVerificationEmailService(email);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Verification email has been resent. Please check your inbox.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to resend verification email",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-4 rounded border-orange-300 mt-2 animate-pulse ">
            <p className="text-sm text-gray-600 mb-2">
                Didn't receive the verification email?
            </p>
            <Button 
                variant="outline"
                onClick={handleResend}
                disabled={loading}
                className="w-full"
            >
                {loading ? "Sending..." : "Resend Verification Email"}
            </Button>
        </div>
    );
}

export default ResendVerification;