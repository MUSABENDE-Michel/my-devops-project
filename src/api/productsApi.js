import defaultProducts from "../data/products";

const STORAGE_KEY = "products_v1";

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function writeStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    // ignore
  }
}

export async function fetchProducts(delay = 250) {
  // emulate a small network delay and return persisted products if any
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = readStorage();
      resolve(stored ?? defaultProducts);
    }, delay);
  });
}

export function addProductsBulk(newItems) {
  const current = readStorage() ?? defaultProducts;
  // ensure each product has id, name, price
  const normalized = newItems.map((p, idx) => ({
    id: p.id ?? Date.now() + idx,
    name: p.name ?? `Product ${Date.now() + idx}`,
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    description: p.description ?? "",
    image: p.image ?? null,
  }));
  const merged = [...current, ...normalized];
  writeStorage(merged);
  return merged;
}

export function resetProducts() {
  writeStorage(defaultProducts);
  return defaultProducts;
}
