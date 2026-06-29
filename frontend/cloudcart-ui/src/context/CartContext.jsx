import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext =
  createContext(null);

export function CartProvider({
  children,
}) {
  const [count, setCount] =
    useState(0);

  const clearCart = () => {
    setCount(0);
  };

  return (
    <CartContext.Provider
      value={{
        count,
        setCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(
    CartContext
  );
}