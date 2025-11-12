// src/components/Cart/CartItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../../app/cartSlice";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md">
      {/* Left: Product Info */}
      <div className="flex items-center gap-4 w-full md:w-2/3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold text-[#FF5722] text-lg">
            {item.title}
          </h3>
          <p className="text-[#E91E63] font-medium">
            ₹{(item.price * 83).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right: Quantity + Remove */}
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3 bg-[#FFF8E1] px-3 py-1 rounded-full">
          <button
            onClick={() => dispatch(decreaseQty(item.id))}
            className="text-[#F44336] hover:text-[#E91E63]"
          >
            <FaMinus />
          </button>
          <span className="text-[#FF9800] font-semibold w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQty(item.id))}
            className="text-[#F44336] hover:text-[#E91E63]"
          >
            <FaPlus />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="text-[#E91E63] hover:text-[#F44336] transition"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
