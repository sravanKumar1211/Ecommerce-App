import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsArray, selectCartSubtotal, clearCart } from "../../app/store";
import { useNavigate } from "react-router-dom";

/**
 * Checkout form collects customer details, shows summary, and empties cart on Place Order.
 */
export default function Checkout() {
  const items = useSelector(selectCartItemsArray);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      setError("Please fill name, email and address.");
      return;
    }
    // Simulate order placement
    dispatch(clearCart());
    // Show message then redirect
    alert("Order placed");
    navigate("/");
  };

  const total = subtotal;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form onSubmit={onSubmit} className="lg:col-span-2 bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Shipping details</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <div className="grid grid-cols-1 gap-3">
          <input name="name" placeholder="Full name" value={form.name} onChange={onChange} className="border px-3 py-2 rounded" />
          <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="border px-3 py-2 rounded" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} className="border px-3 py-2 rounded" />
          <textarea name="address" placeholder="Shipping address" value={form.address} onChange={onChange} className="border px-3 py-2 rounded" />
        </div>

        <div className="mt-6">
          <button type="submit" className="bg-yellow-500 px-4 py-2 rounded">Place Order</button>
        </div>
      </form>

      <aside className="bg-white p-6 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Order summary</h3>
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="flex justify-between">
              <div className="text-sm">{it.title} x {it.qty}</div>
              <div className="text-sm">₹{(it.price * it.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between font-bold">
            <div>Total</div>
            <div>₹{total.toFixed(2)}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
