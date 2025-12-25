import React from "react";
import Link from "next/link";

const PageError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-gray-50 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text text-transparent">
        404
      </h1>
      <p className="mt-4 text-xl sm:text-2xl font-semibold text-gray-600">
        Page Not Found
      </p>
      <p className="mt-2 text-gray-500 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageError;
