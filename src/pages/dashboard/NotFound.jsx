import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        This page is not available yet
      </h1>
      <p className="text-muted-foreground text-lg mb-6">
        We're working on it. Please check back later!
      </p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <ArrowLeft size={18} />
        Go back to previous page
      </button>
    </div>
  );
};

export default NotFound;
