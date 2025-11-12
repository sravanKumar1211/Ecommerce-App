import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="mb-6">No match for <span className="font-mono">{location.pathname}</span></p>
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">Back to Home</Link>
    </div>
  );
}
