import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import ProductList from "./components/ProductList.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import AdminPanel from "./components/AdminPanel.jsx";

function Header({ onOpen, onOpenAdmin }) {
  const { totalCount } = useCart();

  return (
    <header className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">🛍 Online Shop</h1>
      <div className="flex items-center gap-2">
        <button onClick={onOpenAdmin} className="text-sm px-3 py-1 bg-gray-100 rounded">Admin</button>
        <button
          onClick={onOpen}
          className="relative inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded"
        >
          🛒 Cart
          <span className="ml-1 bg-white text-blue-600 rounded-full px-2 text-sm font-semibold">
            {totalCount}
          </span>
        </button>
      </div>
    </header>
  );
}

function Shop() {
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-6">
      <Header onOpen={() => setOpen(true)} onOpenAdmin={() => setAdminOpen(true)} />
      <ProductList />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} onUpdated={() => setRefreshKey((k) => k + 1)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shop />
    </CartProvider>
  );
}
