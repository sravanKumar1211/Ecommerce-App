import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

/**
 * cart slice: manages items keyed by id for easy update/remove.
 * Each cart item shape: { id, title, price, thumbnail, qty }
 */

const initialCartState = {
  items: {}, // { [id]: { id, title, price, thumbnail, qty } }
};

/* cart slice */
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const p = action.payload;
      const existing = state.items[p.id];
      if (existing) {
        existing.qty = Math.min(existing.qty + 1, 9999);
      } else {
        state.items[p.id] = { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, qty: 1 };
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      delete state.items[id];
    },
    updateQuantity(state, action) {
      const { id, qty } = action.payload;
      if (!state.items[id]) return;
      state.items[id].qty = Math.max(1, qty);
    },
    clearCart(state) {
      state.items = {};
    }
  }
});

/* search slice: stores query string used to filter products */
const searchSlice = createSlice({
  name: "search",
  initialState: { query: "" },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    clearSearchQuery(state) {
      state.query = "";
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

/* selectors */
export const selectCartItemsArray = (state) => Object.values(state.cart.items || {});
export const selectCartCount = (state) =>
  Object.values(state.cart.items || {}).reduce((s, it) => s + (it.qty || 0), 0);
export const selectCartSubtotal = (state) =>
  Object.values(state.cart.items || {}).reduce((s, it) => s + (it.qty || 0) * (it.price || 0), 0);
export const selectSearchQuery = (state) => state.search.query;

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  search: searchSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
