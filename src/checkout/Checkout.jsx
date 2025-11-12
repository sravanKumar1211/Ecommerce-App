// src/components/Checkout/Checkout.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../app/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * 83 * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    // Simulate order placing
    setOrderPlaced(true);
    dispatch(clearCart());

    // Redirect after 3s
    setTimeout(() => navigate("/"), 3000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#FFEB3B] via-[#FF9800] to-[#FF5722] text-white">
        <h2 className="text-4xl font-extrabold mb-4">🎉 Order Placed!</h2>
        <p className="text-lg">Thank you for shopping with ShoppyGlobe.</p>
        <p className="text-md mt-2 italic">Redirecting to Home...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-[#E91E63] mb-3">
          Your cart is empty 🛒
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-[#FF9800] text-white px-4 py-2 rounded-full hover:bg-[#F44336] transition"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 grid md:grid-cols-2 gap-10">
      {/* Left: Form */}
      <form
        onSubmit={handleOrder}
        className="bg-[#FFF8E1] rounded-xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#E91E63] mb-4">
          Checkout Details
        </h2>

        <div>
          <label className="block text-[#F44336] font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[#FF9800] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
          />
        </div>

        <div>
          <label className="block text-[#F44336] font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#FF9800] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
          />
        </div>

        <div>
          <label className="block text-[#F44336] font-medium mb-1">
            Address
          </label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-[#FF9800] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
          ></textarea>
        </div>

        <div>
          <label className="block text-[#F44336] font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-[#FF9800] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#FF9800] to-[#F44336] text-white font-semibold py-2 rounded-full mt-4 hover:from-[#FFEB3B] hover:to-[#E91E63] transition"
        >
          Place Order
        </button>
      </form>

      {/* Right: Order Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#E91E63] mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-[#FFEB3B] py-2"
            >
              <div>
                <p className="text-[#FF5722] font-semibold">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-[#F44336] font-semibold">
                ₹{(item.price * 83 * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-[#FF9800] pt-4">
          <p className="text-xl font-bold text-[#F44336]">
            Total: ₹{total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
