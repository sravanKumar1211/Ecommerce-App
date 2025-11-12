import React, { useMemo } from "react";
import useProducts from "../../hooks/useProducts";
import ProductItem from "./ProductItem";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { selectSearchQuery } from "../../app/store";

/**
 * ProductList uses the custom hook useProducts to fetch data on mount.
 * It then uses search query from redux to filter.
 */
export default function ProductList() {
  const { data, loading, error, refetch } = useProducts();
  const query = useSelector(selectSearchQuery);

  const products = useMemo(() => {
    const list = data?.products || [];
    if (!query) return list;
    const q = query.toLowerCase();
    return list.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
    );
  }, [data, query]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center py-8">
        <p className="mb-4 text-red-600">Failed to load products: {error}</p>
        <button onClick={refetch} className="bg-blue-600 text-white px-4 py-2 rounded">Retry</button>
      </div>
    );

  if (!products || products.length === 0)
    return <div className="text-center py-8">No products found.</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
