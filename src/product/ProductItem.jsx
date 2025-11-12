// src/components/Product/ProductItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { addToCart } from "../../app/cartSlice"; // ensure this action exists

function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-2xl">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-52 w-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-[#FF5722] text-lg truncate">
          {product.title}
        </h3>
        <p className="text-[#E91E63] font-bold text-xl">
          ₹{product.price * 83} {/* converting approx USD → INR */}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-1 text-[#FF9800]">
          {Array.from({ length: Math.round(product.rating) }, (_, i) => (
            <FaStar key={i} />
          ))}
          <span className="text-sm text-[#F44336]">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-2 w-full bg-gradient-to-r from-[#FF9800] to-[#F44336] text-white py-2 rounded-full font-medium hover:from-[#FFEB3B] hover:to-[#E91E63] transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
