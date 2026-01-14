import React from "react";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product, onOpenDetail }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded p-2 shadow-sm flex flex-col hover:shadow-md transition cursor-pointer">
      <div onClick={() => onOpenDetail(product)}>
        <div className="h-40 w-full bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>
        <div className="mt-3">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
