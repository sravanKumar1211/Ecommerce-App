// src/components/Header.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#FFEB3B] via-[#FF9800] to-[#FF5722] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Left: Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          {/* Simple logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#F44336]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 20V12l10-5v10l-10 5zM2 7v10l10 5V12L2 7z" />
          </svg>
          <h1 className="text-2xl font-bold text-[#E91E63] tracking-wide">
            ShoppyGlobe
          </h1>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#E91E63] transition ${
                isActive ? "text-[#E91E63]" : "text-[#F44336]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `hover:text-[#E91E63] transition ${
                isActive ? "text-[#E91E63]" : "text-[#F44336]"
              }`
            }
          >
            Shop Now
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `hover:text-[#E91E63] transition ${
                isActive ? "text-[#E91E63]" : "text-[#F44336]"
              }`
            }
          >
            Checkout
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-[#E91E63] transition ${
                isActive ? "text-[#E91E63]" : "text-[#F44336]"
              }`
            }
          >
            Cart
          </NavLink>
        </nav>

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="hidden md:block px-3 py-1 rounded-full text-sm focus:outline-none border border-[#FF9800] placeholder:text-[#FF5722] text-[#F44336]"
          />
          <Link to="/cart" className="relative">
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-[#F44336]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293A1 1 0 007.118 17h9.764a1 1 0 00.911-1.707L17 13M10 21h4"
              />
            </svg>
            {/* Cart Count */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E91E63] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-center pb-2">
        <nav className="flex space-x-4 text-sm">
          <Link to="/" className="text-[#F44336] hover:text-[#E91E63]">
            Home
          </Link>
          <Link to="/shop" className="text-[#F44336] hover:text-[#E91E63]">
            Shop Now
          </Link>
          <Link to="/checkout" className="text-[#F44336] hover:text-[#E91E63]">
            Checkout
          </Link>
          <Link to="/cart" className="text-[#F44336] hover:text-[#E91E63]">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
