import { useRouteError, Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";

export default function NotFound() {
  const err = useRouteError();
  console.error(err);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EAEDED] text-center px-4">
      {/* Error Icon + Title */}
      <div className="flex items-center justify-center text-[#B12704] text-7xl sm:text-8xl mb-4">
        <TbFaceIdError className="mr-2" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-3">
        Oops! Something went wrong.
      </h1>

      {/* Error Description */}
      <div className="flex flex-col sm:flex-row justify-center items-center mb-3 text-gray-800">
        <h1 className="text-xl sm:text-2xl font-semibold px-2">
          Error {err?.status || 404}:
        </h1>
        <h3 className="text-lg sm:text-xl px-2">
          Page Not Found
        </h3>
      </div>

      <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-md">
        {err?.message || "We’re sorry, but the page you’re looking for doesn’t exist or has been moved."}
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-base px-6 py-2.5 rounded-md shadow-sm transition-all"
      >
        ← Back to Home
      </Link>

      {/* Small footer-like note */}
      <p className="text-sm text-gray-500 mt-6">
        Need help? Visit our{" "}
        <span className="text-[#007185] hover:text-[#C7511F] cursor-pointer underline transition">
          Support Center
        </span>
      </p>
    </div>
  );
}
