/**
 * Small wrapper over fetch to centralize product API calls.
 * Throws Error with friendly message on non-OK response.
 */

const BASE = "https://dummyjson.com";

export async function getAllProducts() {
  const resp = await fetch(`${BASE}/products`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch products: ${resp.status} ${resp.statusText}`);
  }
  return resp.json(); // returns { products: [...], total, limit, skip }
}

export async function getProductById(id) {
  const resp = await fetch(`${BASE}/products/${id}`);
  if (!resp.ok) {
    throw new Error(`Failed to fetch product ${id}: ${resp.status} ${resp.statusText}`);
  }
  return resp.json(); // returns product object
}
