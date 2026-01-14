import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

const LOCAL_KEY = "cart_v1";

function fromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw);
  } catch (e) {
    return { items: [] };
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }
    case "REMOVE": {
      const id = action.payload;
      return { ...state, items: state.items.filter((i) => i.id !== id) };
    }
    case "INCREMENT": {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
      };
    }
    case "DECREMENT": {
      const id = action.payload;
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => fromStorage());

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore
    }
  }, [state]);

  const addItem = (product) => dispatch({ type: "ADD", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE", payload: id });
  const increment = (id) => dispatch({ type: "INCREMENT", payload: id });
  const decrement = (id) => dispatch({ type: "DECREMENT", payload: id });
  const clear = () => dispatch({ type: "CLEAR" });

  const totalCount = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, increment, decrement, clear, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
