import React, { useState } from "react";

export default function CheckoutForm({ onCancel, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Valid email required";
    if (address.trim().length < 5) e.address = "Address is too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    // Simulate submit
    setTimeout(() => {
      onSuccess({ name, email, address });
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Shipping address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        {errors.address && <div className="text-red-600 text-sm mt-1">{errors.address}</div>}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-green-600 text-white px-4 py-2 rounded">Place order</button>
        <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
}
