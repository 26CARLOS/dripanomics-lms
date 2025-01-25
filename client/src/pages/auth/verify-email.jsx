import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmailService } from '@/services';

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Verifying...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await verifyEmailService(token);
                if (response.success) {
                    setStatus('Email verified successfully! Redirecting to login...');
                    setTimeout(() => navigate('/auth'), 3000);
                }
            } catch (error) {
                setStatus('Verification failed. Please try again.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
                <p>{status}</p>
            </div>
        </div>
    );
}

export default VerifyEmail;