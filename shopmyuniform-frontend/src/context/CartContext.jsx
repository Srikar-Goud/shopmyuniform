import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart);
    } catch {
      // ignore - user may not be logged in yet
    }
  }, [user]);

  const addToCart = async (productId, size, quantity = 1) => {
    const { data } = await api.post("/cart/items", { productId, size, quantity });
    setCart(data.cart);
  };

  const updateItem = async (itemId, quantity) => {
    const { data } = await api.put(`/cart/items/${itemId}`, { quantity });
    setCart(data.cart);
  };

  const removeItem = async (itemId) => {
    const { data } = await api.delete(`/cart/items/${itemId}`);
    setCart(data.cart);
  };

  const itemCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const total = cart.items?.reduce((sum, i) => sum + i.quantity * i.priceAtAdd, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, refreshCart, addToCart, updateItem, removeItem, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
