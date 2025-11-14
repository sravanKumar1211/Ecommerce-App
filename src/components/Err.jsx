export default function Err() {
  return (
    // =================== Main Container ===================
    <div className="flex flex-col items-center justify-center h-[70vh] bg-[#EAEDED] px-4">
      {/* =================== Error Card ===================
          This card mimics Amazon’s error message box — centered, white, with subtle shadow and border.
      */}
      <div className="bg-white shadow-md border border-gray-200 rounded-md p-8 max-w-md text-center">
        
        {/* Warning Icon (Amazon-style yellow color) */}
        <div className="text-[#F7CA00] text-5xl mb-4">⚠️</div>

        {/* Error Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Oops!</h1>

        {/* Error Message */}
        <p className="text-lg text-gray-700 mb-4">
          Something went wrong while fetching your data.
        </p>

        {/* Reload / Retry Button
            - Reloads the page to re-trigger data fetching.
            - Styled in Amazon’s yellow theme with hover effect.
        */}
        <button
          onClick={() => window.location.reload()}
          className="mt-3 inline-block px-6 py-2 bg-[#FFD814] text-gray-900 font-medium rounded-md hover:bg-[#F7CA00] transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
