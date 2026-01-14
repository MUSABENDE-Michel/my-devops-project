import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import ProductDetail from "./ProductDetail.jsx";
import { fetchProducts } from "../api/productsApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchProducts().then((data) => {
      if (mounted) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      {loading ? (
        <div className="text-gray-600">Loading products…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpenDetail={(prod) => setSelected(prod)} />
          ))}
        </div>
      )}

      <ProductDetail product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
