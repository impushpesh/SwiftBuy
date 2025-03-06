import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

function UnauthPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <FaLock className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800">Access Denied</h1>
      <p className="mt-2 text-lg text-gray-600 text-center">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default UnauthPage;
