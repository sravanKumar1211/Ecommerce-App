// src/components/Loader.jsx
import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-3">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-[#FF9800] border-t-[#E91E63] rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-[#F44336] text-lg font-semibold">Loading...</p>
    </div>
  );
}

export default Loader;
