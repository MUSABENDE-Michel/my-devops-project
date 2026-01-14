import React from "react";

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white rounded shadow-lg z-10 max-w-3xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-64 md:h-auto">
            {product.image && (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button onClick={onClose} className="text-gray-600">Close</button>
            </div>

            <p className="mt-3 text-gray-700">{product.description}</p>
            <div className="mt-4 text-2xl font-bold">${product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
