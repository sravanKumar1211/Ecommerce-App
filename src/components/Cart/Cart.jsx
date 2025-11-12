import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsArray, selectCartSubtotal, removeFromCart, updateQuantity } from "../../app/store";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";

/**
 * Cart page lists cart items and summary. quantity updates use redux actions.
 */
export default function Cart() {
  const items = useSelector(selectCartItemsArray);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRemove = (id) => dispatch(removeFromCart(id));
  const onUpdate = (id, qty) => dispatch(updateQuantity({ id, qty }));

  if (!items || items.length === 0)
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">Continue Shopping</Link>
      </div>
    );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {items.map((it) => (
          <CartItem key={it.id} item={it} onRemove={onRemove} onUpdate={onUpdate} />
        ))}
      </div>

      <aside className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold mb-4"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
        <button onClick={() => navigate("/checkout")} className="w-full bg-yellow-500 px-4 py-2 rounded">Proceed to Checkout</button>
      </aside>
    </div>
  );
}
