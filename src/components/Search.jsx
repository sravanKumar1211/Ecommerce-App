import { Link } from "react-router-dom";
import { memo, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../utils/productSlice";

const ProductItem = lazy(() => import("./ProductItem"));
const MemoizedProductItem = memo(ProductItem);

export default function Search({ searchText }) {
  const dispatch = useDispatch();
  const { filteredProducts, products } = useSelector((state) => state.product);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (products.length > 0) {
        dispatch(setSearchQuery(searchText));
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [dispatch, searchText, products]);

  if (!products.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg text-gray-700">
        Loading products...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EAEDED] px-4 sm:px-8 py-10">
      {/* Search Header */}
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

      {/* Product Results */}
      <Suspense fallback={<div className="text-center text-gray-600">Loading results...</div>}>
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {filteredProducts.map((item) => (
              <MemoizedProductItem item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[50vh] bg-white border border-gray-200 rounded-md shadow-sm">
            <p className="text-xl font-medium text-gray-800">
              No products found.
            </p>
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
