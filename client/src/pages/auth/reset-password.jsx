import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordService } from "@/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await resetPasswordService(token, password);
            if (response.success) {
                toast({
                    title: "Success",
                    description: "Password has been reset successfully",
                });
                navigate('/auth');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to reset password",
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
                        <CardDescription>Enter your new password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

export default ResetPassword;