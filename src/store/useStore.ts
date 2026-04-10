import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  user: User | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (user: User) => void;
  logout: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: {
        id: 'u1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        addresses: [
          { id: 'a1', label: 'Home', street: '123 Main St', city: 'Anytown', zip: '12345' }
        ],
        orders: []
      }, // Mock logged in user by default for demo
      
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.cart.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return { cart: [...state.cart, { product, quantity }] };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.product.id !== productId)
      })),
      
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: quantity <= 0 
          ? state.cart.filter(item => item.product.id !== productId)
          : state.cart.map(item => 
              item.product.id === productId ? { ...item, quantity } : item
            )
      })),
      
      clearCart: () => set({ cart: [] }),
      
      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      })),
      
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'freshmart-storage',
    }
  )
);
