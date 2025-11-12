import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Loader from "../components/Loader";

// lazy page imports
const Home = React.lazy(() => import("../pages/Home"));
const ProductPage = React.lazy(() => import("../pages/ProductPage"));
const CartPage = React.lazy(() => import("../pages/CartPage"));
const CheckoutPage = React.lazy(() => import("../pages/CheckoutPage"));
const NotFound = React.lazy(() => import("../components/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "product/:productId", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
