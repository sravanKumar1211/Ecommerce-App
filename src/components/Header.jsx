import { BsCart2 } from "react-icons/bs";
import { FaShopify } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiTwotoneHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  // =================== Local State ===================
  // Used to toggle mobile navigation menu visibility
  const [click, setclick] = useState(false);

  // =================== Redux State ===================
  // Retrieves total number of cart items from Redux store
  const totalCartItems = useSelector((store) => store.cart.total);

  // =================== JSX Layout ===================
  return (
    // ======== Main Header Bar ========
    <header className="bg-[#131921] text-white sticky top-0 z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-8">
        
        {/* =================== Logo Section ===================
            - “ShoppyGlobe” logo styled in Amazon’s color theme (yellow & white)
            - Acts as a clickable home link
        */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-semibold tracking-wide flex items-center gap-1"
        >
          <span className="text-[#FFD814] hover:text-[#F7CA00] transition">
            Shoppy⤻
          </span>
          <span className="text-white">Globe</span>
        </Link>

        {/* =================== Desktop Navigation Links ===================
            - Visible only on medium and larger screens (md:flex)
            - Each link has an icon + text, styled similar to Amazon navbar
        */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Home Link */}
          <Link
            to="/"
            className="relative flex items-center gap-1 text-sm font-medium hover:text-[#FFD814] transition"
          >
            <AiTwotoneHome className="text-lg" />
            <span>Home</span>
          </Link>

          {/* Shop Link */}
          <Link
            to="/category"
            className="relative flex items-center gap-1 text-sm font-medium hover:text-[#FFD814] transition"
          >
            <FaShopify className="text-lg" />
            <span>ShopNow</span>
          </Link>

          {/* Checkout Link */}
          <Link
            to="/checkout"
            className="relative flex items-center gap-1 text-sm font-medium hover:text-[#FFD814] transition"
          >
            <RiBillLine className="text-lg" />
            <span>Checkout</span>
          </Link>

          {/* Cart Link with Badge */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-sm font-medium hover:text-[#FFD814] transition"
          >
            <BsCart2 className="text-2xl" />
            {/* Cart Item Count Badge */}
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-[#FFD814] text-[#131921] text-xs font-bold px-1.5 py-0.5 rounded-full border border-[#131921]">
                {totalCartItems}
              </span>
            )}
            <span>Cart</span>
          </Link>
        </nav>

        {/* =================== Mobile Menu Button ===================
            - Only visible on small screens
            - Toggles dropdown visibility on click
        */}
        <button
          onClick={() => setclick(!click)}
          className="md:hidden border-none cursor-pointer text-2xl text-white hover:text-[#FFD814] transition-colors relative mr-4"
        >
          <RxHamburgerMenu />
        </button>

        {/* =================== Mobile Dropdown Menu ===================
            - Slides open/close using scale and opacity transitions
            - Contains same navigation links as desktop view
            - Styled in Amazon dark theme with yellow hover highlight
        */}
        <div
          className={`md:hidden absolute top-full right-4 bg-[#232F3E] border border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
            click
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-3 w-40">
            {/* Home (mobile) */}
            <Link
              to="/"
              className="no-underline text-gray-200 py-2 px-3 rounded-md hover:bg-[#37475A] hover:text-[#FFD814] transition"
              onClick={() => setclick(false)}
            >
              Home
            </Link>

            {/* Shop (mobile) */}
            <Link
              to="/category"
              className="no-underline text-gray-200 py-2 px-3 rounded-md hover:bg-[#37475A] hover:text-[#FFD814] transition"
              onClick={() => setclick(false)}
            >
              Shop
            </Link>

            {/* Checkout (mobile) */}
            <Link
              to="/checkout"
              className="no-underline text-gray-200 py-2 px-3 rounded-md hover:bg-[#37475A] hover:text-[#FFD814] transition"
              onClick={() => setclick(false)}
            >
              Checkout
            </Link>

            {/* Cart (mobile) */}
            <Link
              to="/cart"
              className="no-underline text-gray-200 py-2 px-3 rounded-md hover:bg-[#37475A] hover:text-[#FFD814] transition"
              onClick={() => setclick(false)}
            >
              Cart ({totalCartItems})
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
