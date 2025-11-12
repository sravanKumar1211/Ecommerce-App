// src/hooks/useProducts.js
import { useState, useEffect } from "react";
import { getAllProducts } from "../api/Products";

const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch function (can be reused by refetch)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts();
      setData(products);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Run on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Return everything needed by components
  return { data, loading, error, refetch: fetchProducts };
};

export default useProducts;
