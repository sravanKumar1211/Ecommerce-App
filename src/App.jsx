import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";

/**
 * App used as root layout. Header is shared; Outlet renders route children.
 * We keep this small and focused.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
