// ========================== Import Redux Toolkit ==========================
// configureStore is a built-in helper from Redux Toolkit that simplifies
// store setup by automatically combining reducers, enabling dev tools,
// and adding default middleware (like thunk for async actions).
import { configureStore } from "@reduxjs/toolkit";

// ========================== Import Reducers ==========================
// Importing individual slices (reducers) that manage specific parts of the state
// cartSlice → handles shopping cart data (items, totals, add/remove logic)
// productSlice → handles product data, search, and filtering logic
import cartReducer from '../utils/cartSlice';
import productReducer from '../utils/productSlice';

// ========================== Create Redux Store ==========================
// configureStore accepts an object with a "reducer" field where
// multiple slice reducers are combined into a single root reducer.
const store = configureStore({
    reducer: {
        cart: cartReducer,       // State branch: "cart" → managed by cartSlice
        product: productReducer  // State branch: "product" → managed by productSlice
    }
});

// ========================== Export Store ==========================
// Export the configured Redux store so it can be provided to the entire
// React app using <Provider store={store}> in the root (index.jsx or main.jsx)
export default store;
