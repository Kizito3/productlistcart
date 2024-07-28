import { create } from "zustand";

interface Product {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  quantity?: number;
}

interface StoreState {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemName: string) => void;
  decrementQuantity: (itemName: string) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      console.log("Adding to cart:", item);
      const existingItem = state.cart.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: (cartItem.quantity ?? 1) + 1 }
              : cartItem
          ),
        };
      } else {
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }
    }),
  decrementQuantity: (itemName) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.name === itemName && item.quantity! > 1
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      ),
    })),
  removeFromCart: (itemName) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== itemName),
    })),
  clearCart: () => set(() => ({ cart: [] })),
}));

export default useStore;
