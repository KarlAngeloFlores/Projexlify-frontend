import React from "react";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 text-center px-6">
      <Ghost className="w-16 h-16 text-gray-500 dark:text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center">404</h1>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent flex items-center">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="group bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 flex items-center shadow-lg cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;