import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import CheckoutForm from "./CheckoutForm.jsx";

export default function CartDrawer({ open, onClose }) {
  const { state, increment, decrement, removeItem, totalPrice, clear } = useCart();
  const [checkout, setCheckout] = useState(false);

  if (!open) return null;

  function handleSuccess(info) {
    // in a real app we'd send order to server
    alert(`Order placed! Thank you, ${info.name}.`);
    clear();
    setCheckout(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div className="mt-4 flex-1 overflow-auto">
          {state.items.length === 0 ? (
            <div className="text-gray-600">Cart is empty</div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">${item.price} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <div className="px-2">{item.quantity}</div>
                    <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-2 text-sm text-red-600">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">Total</div>
            <div className="font-bold">${totalPrice.toFixed(2)}</div>
          </div>
          {!checkout ? (
            <div className="flex gap-2">
              <button onClick={() => setCheckout(true)} className="flex-1 bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
              <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded">Continue</button>
            </div>
          ) : (
            <div>
              <CheckoutForm onCancel={() => setCheckout(false)} onSuccess={handleSuccess} />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
