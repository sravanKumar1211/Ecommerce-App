// src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-[#FFEB3B] via-[#FF9800] to-[#FF5722] text-white px-6">
      {/* 404 Heading */}
      <h1 className="text-9xl font-extrabold text-white drop-shadow-lg">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-[#E91E63]">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-lg text-[#F44336]">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-white text-[#FF5722] font-semibold rounded-full shadow hover:bg-[#FFE082] hover:text-[#E91E63] transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
