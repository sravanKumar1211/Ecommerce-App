import { Link } from "react-router-dom";
import { memo, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/productSlice";

// ========================== Lazy Loading Components ==========================
// Lazy load ProductItem to improve initial load performance
const ProductItem = lazy(() => import("./ProductItem"));
// Memoize ProductItem to prevent unnecessary re-renders when props don't change
const MemoizedProductItem = memo(ProductItem);

export default function Search({ searchText }) {
  // ========================== Redux Setup ==========================
  const dispatch = useDispatch(); // To dispatch actions to Redux store
  // Access product list and filtered product list from Redux state
  const { filteredProducts, products } = useSelector((state) => state.product);

  // ========================== Debounced Search Effect ==========================
  // Runs every time searchText changes
  // Uses a small delay (300ms) to prevent dispatching action on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Dispatch only if products are already loaded
      if (products.length > 0) {
        dispatch(setSearchQuery(searchText)); // Calls reducer to filter products
      }
    }, 300);

    // Cleanup the timeout when component unmounts or when searchText changes
    return () => clearTimeout(timeout);
  }, [dispatch, searchText, products]);

  // ========================== Loading State ==========================
  // Displays when product data isn't yet available
  if (!products.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg text-gray-700">
        Loading products...
      </div>
    );

  // ========================== Render Section ==========================
  return (
    <div className="min-h-screen bg-[#EAEDED] px-4 sm:px-8 py-10">
      {/* ========================== Search Header ==========================
          - Displays search keyword and number of matching results
          - Styled similar to Amazon results summary
      */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-md p-5 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Results for{" "}
          <span className="italic text-[#C7511F]">"{searchText}"</span>
        </h2>
        <p className="text-gray-700 mt-1 text-sm">
          {filteredProducts.length} item
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* ========================== Product Results ==========================
          - Uses Suspense for lazy loading ProductItem components
          - Displays product grid if matches found, else a friendly “No results” message
      */}
      <Suspense fallback={<div className="text-center text-gray-600">Loading results...</div>}>
        {filteredProducts.length > 0 ? (
          // ========================== Grid Display ==========================
          // Shows matching products in a responsive grid layout
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {filteredProducts.map((item) => (
              <MemoizedProductItem item={item} key={item.id} />
            ))}
          </div>
        ) : (
          // ========================== Empty State ==========================
          // When no matching products found
          <div className="flex flex-col justify-center items-center min-h-[50vh] bg-white border border-gray-200 rounded-md shadow-sm">
            <p className="text-xl font-medium text-gray-800">
              No products found.
            </p>
            {/* Back to Home Button */}
            <Link
              to="/"
              className="mt-4 px-5 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium rounded-md shadow-sm transition"
            >
              Back to Home
            </Link>
          </div>
        )}
      </Suspense>
    </div>
  );
}
