import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { forgotPasswordService } from "@/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await forgotPasswordService(email);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Password reset link has been sent to your email",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link to="/" className="flex items-center">
                    <GraduationCap className="h-8 w-8 mr-2"/>
                    <span className="font-bold text-xl">Dripanomics Grail</span>
                </Link>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                        <CardDescription>
                            Enter your email address and we'll send you a link to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </Button>
                            <div className="text-center">
                                <Link 
                                    to="/auth" 
                                    className="text-sm text-gray-600 hover:text-blue-800"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default ForgotPassword;