import { useRouteError, Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

export default function NotFound() {
  // ===================== Route Error Hook =====================
  // `useRouteError()` from React Router helps capture route-related errors.
  // It provides details like status codes (e.g., 404, 500) or custom thrown errors.
  const err = useRouteError();
  console.error(err); // Log the error for debugging in console.

  // ===================== Render Error Page =====================
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EAEDED] text-center px-4">
      {/* ===================== Error Icon & Title =====================
          - Large, expressive error icon styled in Amazon red (#B12704).
          - Center-aligned with responsive sizing.
      */}
      <div className="flex items-center justify-center text-[#B12704] text-7xl sm:text-8xl mb-4">
        <TbFaceIdError className="mr-2" />
      </div>

      {/* Main error heading */}
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-3">
        Oops! Something went wrong.
      </h1>

      {/* ===================== Error Details =====================
          - Displays the error code and message (like 404, 500, etc.)
          - Adjusts layout for small and large screens (stacked on mobile, inline on desktop)
      */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-3 text-gray-800">
        <h1 className="text-xl sm:text-2xl font-semibold px-2">
          Error {err?.status || 404}:
        </h1>
        <h3 className="text-lg sm:text-xl px-2">
          Page Not Found
        </h3>
      </div>

      {/* Error description text with fallback message */}
      <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-md">
        {err?.message ||
          "We’re sorry, but the page you’re looking for doesn’t exist or has been moved."}
      </p>

      {/* ===================== Back to Home Button =====================
          - Primary CTA styled similar to Amazon's button theme (yellow with hover effect)
          - Navigates back to the homepage when clicked.
      */}
      <Link
        to="/"
        className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-base px-6 py-2.5 rounded-md shadow-sm transition-all"
      >
        ← Back to Home
      </Link>

      {/* ===================== Support Footer Note =====================
          - Small footer message for extra assistance.
          - Interactive “Support Center” link styled with hover effects.
      */}
      <p className="text-sm text-gray-500 mt-6">
        Need help? Visit our{" "}
        <span className="text-[#007185] hover:text-[#C7511F] cursor-pointer underline transition">
          Support Center
        </span>
      </p>
    </div>
  );
}
