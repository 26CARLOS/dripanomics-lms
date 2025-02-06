import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ChevronLeft} from 'lucide-react'
import { Button } from '../ui/button';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Button
            onClick={handleGoBack}
            className="text-sm font-medium rounded-md mr-2 bg-gray-600"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
    );
};

export default BackButton;