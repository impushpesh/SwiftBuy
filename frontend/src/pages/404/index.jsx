import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-600">
          We’re sorry, the page you requested could not be found.
        </p>
        <Link 
          to="/" 
          className="inline-block mt-6 px-6 py-2 border border-transparent text-base font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
