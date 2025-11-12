import React from "react";
import ProductList from "../components/Product/ProductList";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
      <ProductList />
    </div>
  );
}
