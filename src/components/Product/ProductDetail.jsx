import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/store";

/**
 * ProductDetail fetches product by id on mount and shows full details.
 */
export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getProductById(productId)
      .then((p) => {
        if (!mounted) return;
        setProduct(p);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load product");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [productId]);

  const onAdd = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0] || ""
      })
    );
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-600">Back to Home</Link>
      </div>
    );
  if (!product) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white p-4 rounded shadow-sm">
        <div className="h-96 flex items-center justify-center bg-gray-50">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} className="max-h-full object-contain" />
        </div>
        <h1 className="text-2xl font-semibold mt-4">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>

      <aside className="bg-white p-4 rounded shadow-sm">
        <div className="text-2xl font-bold mb-2">₹{product.price}</div>
        <div className="text-sm text-gray-500 mb-4">Brand: {product.brand || "—"}</div>
        <button onClick={onAdd} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mb-2">
          Add to Cart
        </button>
        <Link to="/cart" className="block text-center text-blue-600">Go to Cart</Link>
      </aside>
    </div>
  );
}
