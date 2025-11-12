// src/components/Cart/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../../app/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * 83 * item.quantity,
    0
  ); // converting USD to INR

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-[#E91E63] mb-3">
          Your Cart is Empty 🛒
        </h2>
        <Link
          to="/"
          className="text-[#F44336] font-semibold hover:text-[#FF9800]"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-[#E91E63] mb-8 text-center">
        Your Shopping Cart
      </h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center bg-[#FFF8E1] rounded-lg shadow-inner p-6">
        <p className="text-xl font-semibold text-[#F44336]">
          Total: ₹{total.toLocaleString()}
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-5 py-2 bg-[#FF9800] text-white rounded-full hover:bg-[#FF5722] transition"
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="px-5 py-2 bg-gradient-to-r from-[#FF9800] to-[#E91E63] text-white font-medium rounded-full hover:from-[#FFEB3B] hover:to-[#F44336] transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
