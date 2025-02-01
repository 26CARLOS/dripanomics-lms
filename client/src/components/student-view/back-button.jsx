import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ArrowLeft} from 'lucide-react'
import { Button } from '../ui/button';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Button
            onClick={handleGoBack}
            className="text-sm font-medium rounded-md"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>
    );
};

export default BackButton;