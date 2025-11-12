import { useEffect, useState, useCallback, useRef } from "react";
import { getAllProducts } from "../api/products";

/**
 * useProducts: custom hook to fetch products and handle loading/error/refetch.
 * Implements AbortController for cleanup.
 */
export default function useProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const json = await getAllProducts({ signal: controller.signal });
      setData(json);
    } catch (err) {
      if (err.name === "AbortError") return; // aborted
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
