import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import { lazy, useMemo, useEffect, Suspense } from "react";

// Lazy load CartItem component for performance optimization
const CartItem = lazy(() => import("./CartItem"));

export default function Cart() {
  // Access cart state from Redux store
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  // Function to clear all cart items after user confirmation
  function handlecart() {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  }

  // Set page title dynamically when component mounts
  useEffect(() => {
    document.title = "Your Cart | ShoppyGlobe";
  }, []);

  // Calculate subtotal using memoization to prevent unnecessary recalculations
  const subtotal = useMemo(
    () =>
      cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart.items]
  );

  return (
    <div className="bg-[#EAEDED] min-h-screen py-10">
      {/* Main container centered with max width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-8 font-sans text-gray-900 border-b border-gray-300 pb-4">
          Shopping Cart
        </h1>

        {/* If cart is empty */}
        {cart.items.length === 0 ? (
          <div className="text-center text-gray-700 mt-20 bg-white shadow-sm rounded-md py-16">
            <p className="text-lg mb-4 font-medium">🛒 Your cart is empty</p>

            {/* Link to navigate back to home */}
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 bg-[#FFD814] text-gray-900 font-medium rounded-md hover:bg-[#F7CA00] transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // If cart has items
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items Section (Left side on desktop) */}
            <div className="flex flex-col w-full lg:w-3/4 bg-white rounded-md shadow-md p-6 space-y-4">
              <Suspense
                fallback={
                  <div className="text-center text-gray-500 py-8">
                    Loading your cart...
                  </div>
                }
              >
                {/* Render each cart item */}
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-6 last:border-none"
                  >
                    <CartItem item={item} />
                  </div>
                ))}
              </Suspense>
            </div>

            {/* Cart Summary Section (Right side on desktop) */}
            <div className="w-full lg:w-1/4">
              <div className="bg-[#FFFBEA] shadow-lg rounded-md p-6 sticky top-24 border border-yellow-300">
                <h2 className="text-lg font-semibold mb-3 text-gray-900">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span className="font-medium">{cart.total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                {/* Divider */}
                <hr className="my-4 border-gray-300" />

                {/* Order Total */}
                <p className="flex justify-between text-lg font-bold text-gray-900 mb-5">
                  <span>Order Total:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </p>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-center py-2.5 rounded-md font-medium shadow-md transition"
                >
                  Proceed to Buy ({cart.total} item
                  {cart.total > 1 ? "s" : ""})
                </Link>

                {/* Clear Cart Button */}
                <button
                  onClick={handlecart}
                  className="w-full bg-[#E74C3C] text-white py-2 rounded-md font-medium hover:bg-[#C0392B] transition mt-4 shadow-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
