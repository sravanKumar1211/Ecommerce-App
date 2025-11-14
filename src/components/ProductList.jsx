import { Link, useParams } from "react-router-dom";
import useFetchData from "../Hooks/useFetchData";
import { lazy, memo, useState, Suspense } from "react";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";

const Search = lazy(() => import("./Search"));
const Err = lazy(() => import("./Err"));
const ProductItem = lazy(() => import("./ProductItem"));
const MemoizedProductItem = memo(ProductItem);

export default function ProductList() {
  const { category } = useParams();
  const [searchText, setSearchText] = useState("");
  const { products } = useSelector((state) => state.product);
  const { data, loading, error } = useFetchData("https://dummyjson.com/products");

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  function handleclick() {
    if (!searchText.trim()) return;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-700 text-lg">
        Loading products...
      </div>
    );

  {error && (
    <Suspense fallback={<div>Loading Error...</div>}>
      <Err />
    </Suspense>
  )}

  const productsToShow = category
    ? products.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  if (!productsToShow?.length)
    return (
      <div className="min-h-screen bg-[#EAEDED] text-center px-6 py-10">
        {/* Search Bar */}
        <div className="flex justify-center items-center py-4 bg-[#232F3E] rounded-md shadow-md mb-6">
          <input
            type="text"
            placeholder="Search for product"
            value={searchText}
            onChange={handleSearch}
            className="bg-white placeholder-gray-500 w-72 md:w-96 px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-[#FFD814] outline-none transition-all"
          />
          <button
            onClick={handleclick}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-4 py-2 rounded-r-md font-medium flex items-center justify-center transition"
          >
            <IoSearchOutline className="text-xl" />
          </button>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-3 mt-3 capitalize">
          {category ? `${category}` : "All Products"}
        </h1>
        <p className="text-gray-600 italic">No products found in this category.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 rounded-md font-medium transition"
        >
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EAEDED] px-6 py-10">
      {/* Search Bar */}
      <div className="flex justify-center items-center py-4 bg-[#232F3E] rounded-md shadow-md mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchText}
          onChange={handleSearch}
          className="bg-white placeholder-gray-500 w-72 md:w-96 px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-[#FFD814] outline-none transition-all"
        />
        <button
          onClick={handleclick}
          className="bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-4 py-2 rounded-r-md font-medium flex items-center justify-center transition"
        >
          <IoSearchOutline className="text-xl" />
        </button>
      </div>

      {/* Category Title */}
      {searchText ? (
        <Suspense fallback={<div className="text-center text-gray-600">Searching...</div>}>
          <Search searchText={searchText} />
        </Suspense>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 mt-2.5 capitalize border-b-2 border-gray-300 inline-block pb-2">
            {category ? `${category}` : "All Products"}
          </h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {productsToShow.map((item) => (
              <MemoizedProductItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
