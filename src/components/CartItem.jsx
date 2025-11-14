import { useDispatch } from "react-redux";
import { decreaseItem, increaseItems, removeItems } from "../utils/cartSlice.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component"; 

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const discountPrice = item.price * (1 - item.discountPercentage / 100);

  function handleDec() {
    dispatch(decreaseItem(item));
  }

  function handleInc() {
    dispatch(increaseItems(item));
  }

  function handleRemove() {
    if (window.confirm(`Remove "${item.title}" from cart?`)) {
      dispatch(removeItems(item));
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all p-4">
      {/* Product Image */}
      <div className="w-28 h-28 flex items-center justify-center overflow-hidden border border-gray-100 rounded-md bg-gray-50">
        <LazyLoadImage 
          src={item.thumbnail}
          alt={item.title}
          className="object-contain w-full h-full p-2"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-6 mt-3 sm:mt-0 text-gray-800">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
          {item.title}
        </h2>
        <p className="text-sm text-gray-500 mb-1">{item.brand}</p>

        {/* Pricing Section */}
        <div className="mt-1">
          <p className="text-sm text-gray-600">
            Price:{" "}
            <span className="line-through text-gray-400 mr-1">₹{item.price}</span>
            <span className="font-semibold text-[#B12704]">
              ₹{discountPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-sm mt-1 text-gray-700">
            Subtotal:{" "}
            <span className="font-semibold text-gray-900">
              ₹{(discountPrice * item.quantity).toFixed(2)}
            </span>
          </p>
        </div>

        {/* Delivery Info */}
        <p className="text-xs text-green-600 mt-2 font-medium">
          Get FREE Delivery On Prime Membership
        </p>

        {/* Quantity + Remove */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={handleDec}
              className="px-3 py-1 text-gray-700 hover:bg-gray-100 border-r border-gray-300 font-bold"
            >
              −
            </button>
            <span className="px-4 py-1 text-gray-800 font-medium select-none">
              {item.quantity}
            </span>
            <button
              onClick={handleInc}
              className="px-3 py-1 text-gray-700 hover:bg-gray-100 border-l border-gray-300 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-sm text-[#007185] hover:text-[#C7511F] underline transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Price on the right (for large screens) */}
      <div className="hidden sm:block text-right text-gray-900 font-semibold text-lg">
        ₹{(discountPrice * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
