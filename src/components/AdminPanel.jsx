import React, { useState } from "react";
import { addProductsBulk, fetchProducts, resetProducts } from "../api/productsApi";

export default function AdminPanel({ open, onClose, onUpdated }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleImport() {
    setError("");
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array of product objects");
      const updated = addProductsBulk(parsed);
      setText("");
      onUpdated && onUpdated(updated);
      alert(`Imported ${parsed.length} products`);
      onClose();
    } catch (e) {
      setError(e.message || String(e));
    }
  }

  function handleReset() {
    const res = resetProducts();
    onUpdated && onUpdated(res);
    alert("Products reset to defaults.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded shadow-lg z-10 max-w-3xl w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Admin — Import Products</h2>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <p className="text-sm text-gray-600 mb-2">Paste a JSON array of product objects. Each object should have at least <code>name</code> and <code>price</code>. Optional keys: <code>description</code>, <code>image</code>, and <code>id</code>.</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='[{"name":"New product","price":9.99,"image":"https://..."}]' className="w-full h-48 border rounded p-2" />
        {error && <div className="text-red-600 mt-2">{error}</div>}

        <div className="mt-4 flex gap-2">
          <button onClick={handleImport} className="bg-green-600 text-white px-4 py-2 rounded">Import</button>
          <button onClick={handleReset} className="bg-yellow-400 text-black px-4 py-2 rounded">Reset to defaults</button>
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
