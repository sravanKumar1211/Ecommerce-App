import { useParams } from "react-router-dom";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { increaseItems } from "../utils/cartSlice";
import useFetchData from "../Hooks/useFetchData";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Suspense, lazy } from "react";
import { TiStar } from "react-icons/ti";
const Err = lazy(() => import("./Err")); // Lazy-load error component for performance

export default function ProductDetail() {
  // ========================== Setup & Hooks ==========================
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch(); // For adding product to Redux cart
  const [added, setadded] = useState(false); // Tracks whether item added to cart

  // API endpoint for fetching single product details
  const url = "https://dummyjson.com/products";
  const { data, error, loading } = useFetchData(`${url}/${id}`); // Custom hook to fetch product data

  const [mainImg, setMainImg] = useState(data?.thumbnail); // Main product image state

  // ========================== Update Main Image When Data Loads ==========================
  useEffect(() => {
    if (data?.thumbnail) setMainImg(data.thumbnail);
  }, [data]);

  // ========================== Reset 'Added to Cart' Message After Timeout ==========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setadded(false);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [added]);

  // ========================== Loading State ==========================
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600 text-lg">
        Loading product details...
      </div>
    );

  // ========================== Error Handling ==========================
  if (error)
    return (
      <Suspense fallback={<div>Loading error component...</div>}>
        <Err />
      </Suspense>
    );

  // ========================== No Data Fallback ==========================
  if (!data) return null;

  // ========================== Add to Cart Function ==========================
  function handleAddToCart() {
    setadded(true); // Show success message
    dispatch(increaseItems(data)); // Dispatch action to add product to cart
  }

  // Calculate discounted price
  const discountPrice = data?.price * (1 - data?.discountPercentage / 100);

  // ========================== JSX Layout ==========================
  return (
    <div className="min-h-screen bg-[#EAEDED] py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-6 md:px-10">
        {/* ========================== LEFT SECTION - Product Images ========================== */}
        <div className="flex-1 bg-white rounded-md shadow-md p-5 sticky top-24 h-fit">
          {/* Main product image */}
          <LazyLoadImage
            src={mainImg}
            alt={data?.title}
            className="w-full h-[400px] object-contain rounded-md mb-4 border border-gray-200"
          />

          {/* Thumbnail image row for switching main image */}
          <div className="flex gap-3 overflow-x-auto">
            {data?.images?.map((item, index) => (
              <LazyLoadImage
                key={index}
                src={item}
                alt={`${data?.title} ${index}`}
                className={`w-20 h-20 object-cover rounded-md border cursor-pointer transition-all ${
                  mainImg === item
                    ? "border-[#FFD814] ring-2 ring-[#F7CA00]" // Highlight selected image
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setMainImg(item)} // Change main image on click
              />
            ))}
          </div>
        </div>

        {/* ========================== RIGHT SECTION - Product Info ========================== */}
        <div className="flex-1 bg-white rounded-md shadow-md p-6">
          {/* Product Title & Brand */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
            {data?.title}
          </h1>
          <h3 className="text-gray-600 italic text-sm mb-2">
            by <b>{data?.brand || "Unknown Brand"}</b>
          </h3>

          {/* ========================== Tags Section ========================== */}
          <div className="flex flex-wrap gap-2 mt-3">
            {data?.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-gray-300 rounded-full text-xs text-gray-700 hover:border-[#FFD814] transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* ========================== Rating ========================== */}
          <p
            className={`text-sm font-semibold flex items-center mt-3 ${
              data.rating >= 4
                ? "text-green-600"
                : data.rating >= 3
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            <TiStar className="text-lg mr-1" /> {data?.rating} out of 5
          </p>

          {/* ========================== Price Section ========================== */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="line-through text-gray-500 text-lg">
              ₹{data?.price}
            </span>
            <span className="text-[#B12704] text-3xl font-bold">
              ₹{discountPrice.toFixed(2)}
            </span>
            <span className="text-green-600 text-sm font-medium">
              {data?.discountPercentage}% off
            </span>
          </div>

          {/* ========================== Add to Cart Button ========================== */}
          <button
            onClick={handleAddToCart}
            className="cursor-pointer mt-5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 px-8 py-2.5 rounded-md font-medium shadow-md transition-all"
          >
            Add to Cart
          </button>
          {added && (
            <p className="text-green-700 text-sm font-semibold mt-2">
              ✅ Item Added to Cart
            </p>
          )}

          {/* ========================== Policy Info ========================== */}
          <div className="flex flex-wrap gap-6 items-start mt-6">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <MdOutlineAssignmentReturn size={20} className="text-[#007185]" />
              <p>{data?.returnPolicy}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <RiSecurePaymentLine size={20} className="text-[#007185]" />
              <p>{data?.warrantyInformation}</p>
            </div>
          </div>

          {/* ========================== Product Specifications ========================== */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Product Details
            </h3>
            <p className="text-gray-700 text-sm">
              Dimensions:{" "}
              <span className="italic">
                {data?.dimensions?.width}W × {data?.dimensions?.height}H ×{" "}
                {data?.dimensions?.depth}D
              </span>
            </p>
            <p className="text-gray-700 text-sm">
              Weight: {data?.weight} kg
            </p>
          </div>

          {/* ========================== Description ========================== */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              About this item
            </h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm leading-relaxed">
              {data?.description
                ?.split(".")
                ?.filter((sent) => sent.trim().length > 0)
                .map((sent) => (
                  <li key={sent} className="mb-1">
                    {sent.trim()}.
                  </li>
                ))}
            </ul>
          </div>

          {/* ========================== Reviews Section ========================== */}
          <div className="mt-8 border-t border-gray-300 pt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Customer Reviews
            </h2>

            {/* Average Rating Display */}
            <div className="flex items-center gap-2 mb-3">
              <h3
                className={`text-xl font-bold ${
                  data.rating >= 4
                    ? "text-green-600"
                    : data.rating >= 3
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
              >
                {data.rating}
              </h3>
              <span className="text-lg font-bold text-yellow-500">★</span>
            </div>

            {/* ========================== Review Cards ========================== */}
            <div className="space-y-4">
              {data?.reviews?.length > 0 ? (
                data.reviews.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F8F8F8] p-4 rounded-md border border-gray-200 hover:shadow-md transition"
                  >
                    {/* Reviewer name and avatar */}
                    <p className="font-semibold text-gray-800 flex items-center gap-2 mb-1">
                      <CgProfile className="text-gray-600 text-lg" />{" "}
                      {item.reviewerName}
                    </p>

                    {/* Rating badge */}
                    <p
                      className={`text-xs w-fit px-2 py-0.5 rounded-md text-white font-medium ${
                        item.rating >= 4
                          ? "bg-green-600"
                          : item.rating >= 3
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.rating} <TiStar className="inline text-yellow-300" />
                    </p>

                    {/* Review date */}
                    <p className="text-xs text-gray-500 mt-1">
                      Reviewed on {new Date(item.date).toDateString()}
                    </p>

                    {/* Review comment */}
                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                      {item.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
