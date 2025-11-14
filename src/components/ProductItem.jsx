import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { increaseItems, decreaseItem } from "../utils/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TiStar } from "react-icons/ti";

export default function ProductItem({ item }) {
  // ========================== Redux Setup ==========================
  const dispatch = useDispatch(); // to trigger cart actions (increase/decrease items)

  // ========================== Price Calculation ==========================
  // Apply discount percentage to calculate discounted price
  const discountPrice = item.price * (1 - item.discountPercentage / 100);

  // ========================== Get Product Quantity from Redux ==========================
  // Finds the product quantity in the global cart (if exists), else returns 0
  const quantity = useSelector(
    (state) =>
      state.cart.items.find((p) => p.id === item.id)?.quantity || 0
  );

  // ========================== Cart Action Handlers ==========================
  // Add item to cart
  function handleAddToCart(item) {
    dispatch(increaseItems(item));
  }

  // Decrease item quantity in cart
  function handleDec() {
    dispatch(decreaseItem(item));
  }

  // Increase item quantity in cart
  function handleInc() {
    dispatch(increaseItems(item));
  }

  // ========================== JSX Structure ==========================
  return (
    <div
      className="w-[230px] bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
      key={item.id}
    >
      {/* ========================== Product Image ==========================
          - Lazy loaded image for better performance
          - Discount badge shown if discount > 0
          - Clicking image navigates to product detail page
      */}
      <Link to={`/productdetail/${item.id}`}>
        <div className="relative overflow-hidden rounded-t-md">
          <LazyLoadImage
            src={item.thumbnail}
            alt={item.title}
            className="h-[200px] w-full object-contain p-2 bg-white transition-transform duration-300 hover:scale-105"
          />
          {item.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-[#B12704] text-white text-xs font-semibold px-2 py-1 rounded-sm shadow-sm">
              {item.discountPercentage}% off
            </span>
          )}
        </div>

        {/* ========================== Product Info Section ==========================
            - Displays product title, rating, and pricing
            - Clickable area leads to product detail page
        */}
        <div className="p-3 text-left">
          {/* Product Title */}
          <h2 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-[#007185] transition-colors">
            {item.title}
          </h2>

          {/* Product Rating */}
          <div className="flex items-center mt-1">
            <TiStar
              className={`text-base mr-1 ${
                item.rating >= 4
                  ? "text-green-600"
                  : item.rating >= 3
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
            />
            <p
              className={`text-xs font-semibold ${
                item.rating >= 4
                  ? "text-green-700"
                  : item.rating >= 3
                  ? "text-orange-600"
                  : "text-red-600"
              }`}
            >
              {item.rating}
            </p>
          </div>

          {/* Product Price Section */}
          <div className="mt-2 flex items-center gap-2">
            <span className="line-through text-gray-400 text-xs">
              ₹{item.price}
            </span>
            <span className="text-[#B12704] font-semibold text-sm">
              ₹{discountPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      {/* ========================== Add to Cart / Quantity Controls ==========================
          - If product not added → Show "Add to Cart" button
          - If already in cart → Show quantity increment/decrement buttons
      */}
      <div className="px-3 pb-3 text-center">
        {quantity === 0 ? (
          // Add to Cart button (initial state)
          <button
            onClick={() => handleAddToCart(item)}
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-medium text-sm py-1.5 rounded-md shadow-sm transition"
          >
            Add to Cart
          </button>
        ) : (
          // Quantity update controls
          <div className="flex items-center justify-center gap-3">
            {/* Decrease Quantity */}
            <button
              onClick={handleDec}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-800 rounded-md text-sm font-semibold transition"
            >
              −
            </button>

            {/* Current Quantity */}
            <span className="px-3 py-1 border border-gray-300 rounded-md text-gray-800 text-sm font-medium">
              {quantity}
            </span>

            {/* Increase Quantity */}
            <button
              onClick={handleInc}
              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-800 rounded-md text-sm font-semibold transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
