// src/api/products.js

// Function to fetch all products
export const getAllProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products; // API returns { products: [...] }
  } catch (error) {
    throw error;
  }
};

// Function to fetch a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product details");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
