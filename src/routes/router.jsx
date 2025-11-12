// src/routes/router.jsx
import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Loader from "../components/Loader";

const Home = lazy(() => import("../pages/Home"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const NotFound = lazy(() => import("../components/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout wrapper
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
