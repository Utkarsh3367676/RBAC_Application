import React from "react";
import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-red-600">401</h1>
        <h2 className="text-2xl font-semibold text-gray-900">
          Unauthorized Access
        </h2>
        <p className="text-gray-600">
          You don't have permission to access this resource.
        </p>
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
