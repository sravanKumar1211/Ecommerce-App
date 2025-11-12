import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, selectCartSubtotal } from "../app/store";
import { setSearchQuery } from "../app/store";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const [local, setLocal] = useState("");

  const onSearchChange = useCallback(
    (e) => {
      const v = e.target.value;
      setLocal(v);
      dispatch(setSearchQuery(v));
    },
    [dispatch]
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-yellow-400 rounded-sm px-2 py-1 font-bold text-lg">Shoppy</div>
          <div className="text-xl font-semibold">Globe</div>
        </Link>

        {/* Search bar (Amazon-like centered) */}
        <div className="flex-1">
          <div className="flex items-center">
            <input
              value={local}
              onChange={onSearchChange}
              placeholder="Search products, categories, brands..."
              className="w-full rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none"
            />
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-500 px-4 rounded-r-md font-medium hover:bg-yellow-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Cart / totals */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="text-sm">
              <div className="font-medium">{cartCount} items</div>
              <div className="text-xs text-gray-500">₹{subtotal.toFixed(2)}</div>
            </div>
          </Link>
        </div>
      </div>

      {/* category bar (simple) */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex gap-4 text-sm overflow-x-auto">
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">All</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Electronics</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Clothing</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Home</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Books</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Beauty</span>
          <span className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">Sports</span>
        </div>
      </div>
    </header>
  );
}
