// src/components/Product/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from "../Loader";
import { FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-[#F44336] mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-2xl shadow-lg w-96 object-cover"
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-[#E91E63]">{product.title}</h1>
          <p className="text-2xl font-semibold text-[#F44336]">
            ₹{product.price * 83}
          </p>
          <p className="text-[#FF9800] font-medium">Brand: {product.brand}</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Warranty / Guarantee / Service */}
          <div className="space-y-2 mt-4 text-sm">
            <p className="flex items-center gap-2 text-[#FF5722]">
              <FaShieldAlt /> 1-Year Warranty
            </p>
            <p className="flex items-center gap-2 text-[#FF5722]">
              <FaUndo /> 7-Day Return Policy
            </p>
            <p className="flex items-center gap-2 text-[#FF5722]">
              <FaTruck /> Free Delivery & Service Available
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-1 text-[#FF9800] mt-4">
            {Array.from({ length: Math.round(product.rating) }, (_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-sm text-[#F44336]">
              ({product.rating.toFixed(1)} / 5)
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-[#FFF8E1] rounded-xl p-6 shadow-inner">
        <h2 className="text-2xl font-bold text-[#E91E63] mb-4">Customer Reviews</h2>
        <p className="text-gray-700 italic">
          “Absolutely loved the quality and fast delivery!”
        </p>
        <p className="text-gray-700 italic mt-2">
          “Worth the price. Highly recommended.”
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
