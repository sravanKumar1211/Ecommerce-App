import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formErr, setFormErr] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    city: "",
    state: "",
    pincode: "",
    cod: "cod",
  });

  const subtotal = cart.items.reduce(
    (total, item) =>
      total +
      (item.price * (1 - item.discountPercentage / 100)) * item.quantity,
    0
  );

  const shipping = subtotal > 500 ? 0 : 40;
  const discount = subtotal * 0.05;
  const total = subtotal - discount + shipping;

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function validateForm() {
    const errors = {};
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPhone = /^\d{10}$/;
    const regexName = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    const regex = /^[A-Za-z]+$/;

    if (!formData.name.trim() || !regexName.test(formData.name.trim()))
      errors.name = "Enter valid name";
    if (!formData.email.trim() || !regexMail.test(formData.email.trim()))
      errors.email = "Enter valid email";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.contact.trim() || !regexPhone.test(formData.contact))
      errors.contact = "Enter valid contact number";
    if (!formData.city.trim() || !regex.test(formData.city.trim()))
      errors.city = "Valid City Name is required";
    if (!formData.state.trim() || !regex.test(formData.state.trim()))
      errors.state = "Valid State Name is required";
    if (!formData.pincode.trim() || formData.pincode.trim().length !== 6)
      errors.pincode = "Enter valid pincode";

    return errors;
  }

  function handleForm(e) {
    e.preventDefault();
    const errors = validateForm();
    setFormErr(errors);
    if (Object.keys(errors).length > 0) return;
    setSuccessMsg("✅ Order placed successfully! Redirecting...");
  }

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg("");
      dispatch(clearCart());
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg, navigate]);

  return (
    <div className="min-h-screen bg-[#EAEDED] py-10">
      {cart.items.length === 0 ? (
        <div className="text-center text-gray-700 mt-20 bg-white shadow-sm rounded-md py-16 max-w-md mx-auto">
          <p className="text-lg mb-4 font-medium">🛒 Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-[#FFD814] text-gray-900 font-medium rounded-md hover:bg-[#F7CA00] transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {successMsg && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] text-lg font-medium animate-fade-slide">
              {successMsg}
            </div>
          )}

          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
            {/* Billing Info Section */}
            <div className="w-full lg:w-2/3 bg-white border border-gray-200 shadow-sm rounded-md p-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                Enter your delivery address
              </h1>

              <form
                onSubmit={handleForm}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {/* Form Fields */}
                {[
                  { id: "name", label: "Full Name", type: "text" },
                  { id: "email", label: "Email Address", type: "email" },
                  { id: "contact", label: "Phone Number", type: "number" },
                  { id: "address", label: "Address", type: "text" },
                  { id: "city", label: "City", type: "text" },
                  { id: "state", label: "State", type: "text" },
                  { id: "pincode", label: "Pincode", type: "number" },
                ].map((field) => (
                  <div className="flex flex-col" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="mb-1 text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.label}
                      className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#F7CA00] focus:border-[#F7CA00]"
                    />
                    {formErr[field.id] && (
                      <p className="text-red-500 text-sm">
                        {formErr[field.id]}
                      </p>
                    )}
                  </div>
                ))}

                {/* Payment */}
                <div className="flex flex-col">
                  <label
                    htmlFor="cod"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Payment Method
                  </label>
                  <select
                    id="cod"
                    onChange={handleChange}
                    value={formData.cod}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#F7CA00] focus:border-[#F7CA00]"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="upi">UPI / Net Banking</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="col-span-1 sm:col-span-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-2.5 rounded-md font-medium transition mt-2"
                >
                  Place your order
                </button>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  Order Summary
                </h3>

                <ul className="divide-y divide-gray-100 text-gray-700">
                  {cart.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between py-2 text-sm"
                    >
                      <span className="max-w-[70%]">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₹
                        {(
                          item.price *
                          (1 - item.discountPercentage / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 border-gray-300" />

                <div className="space-y-1 text-sm text-gray-700">
                  <p className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Discount (5%):</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-medium">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </p>
                </div>

                <hr className="my-4 border-gray-300" />

                <p className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Order Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </p>

                <button
                  onClick={handleForm}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 py-2.5 rounded-md font-medium mt-5 shadow-sm transition"
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
