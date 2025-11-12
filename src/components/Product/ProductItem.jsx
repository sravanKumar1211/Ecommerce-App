import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/store";
import PropTypes from "prop-types";

/**
 * ProductItem: presentational card. Receives `product` prop.
 * Add to cart dispatches minimal info to the redux store.
 */
export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0] || ""
      })
    );
  };

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="h-48 flex items-center justify-center overflow-hidden bg-gray-50">
          <img
            loading="lazy"
            src={product.thumbnail || product.images?.[0]}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>
        <h3 className="mt-3 text-sm font-medium text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </Link>

      <div className="p-4 border-t flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">₹{product.price}</div>
          <div className="text-xs text-gray-500">Rating: {product.rating || "N/A"}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={onAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm font-medium"
          >
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`} className="text-xs text-blue-600 hover:underline">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};
