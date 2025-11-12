// src/components/Product/ProductList.jsx
import React from "react";
import useProducts from "../../hooks/useProducts";
import Loader from "../Loader";
import ProductItem from "./ProductItem";

function ProductList() {
  const { data: products, loading, error } = useProducts();

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-[#F44336] mt-10 font-semibold">
        Failed to load products. Please try again.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#E91E63] mb-6 text-center">
        Explore Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
