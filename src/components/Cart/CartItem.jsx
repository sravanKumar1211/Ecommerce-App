import React from "react";
import PropTypes from "prop-types";

/**
 * CartItem: presentational. Receives item, and callbacks onRemove and onUpdate.
 */
export default function CartItem({ item, onRemove, onUpdate }) {
  const change = (newQty) => {
    if (newQty < 1) return;
    onUpdate(item.id, newQty);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm flex gap-4">
      <div className="w-28 h-28 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img src={item.thumbnail} alt={item.title} className="max-h-full object-contain" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{item.title}</h4>
        <div className="text-sm text-gray-500">Price: ₹{item.price}</div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => change(item.qty - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={item.qty <= 1}
          >
            -
          </button>
          <div className="px-3 py-1 border">{item.qty}</div>
          <button onClick={() => change(item.qty + 1)} className="px-2 py-1 border rounded">+</button>
          <button onClick={() => onRemove(item.id)} className="ml-6 text-red-600 text-sm">Remove</button>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold">₹{(item.price * item.qty).toFixed(2)}</div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};
