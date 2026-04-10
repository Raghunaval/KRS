import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, wishlist, toggleWishlist } = useStore();
  
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-green-100 transition-all duration-300 relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.originalPrice && (
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
        {product.stockCount < 10 && product.inStock && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            Only {product.stockCount} left
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-red-500 text-red-500")} />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-gray-800 leading-tight mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        <div className="text-sm text-gray-500 mb-3">{product.weight}</div>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
            )}
          </div>

          {/* Add to Cart Actions */}
          <div onClick={(e) => e.preventDefault()}>
            {quantity > 0 ? (
              <div className="flex items-center bg-green-50 rounded-lg border border-green-200">
                <button 
                  onClick={handleDecrement}
                  className="w-8 h-8 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-l-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-green-800">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="w-8 h-8 flex items-center justify-center text-green-700 hover:bg-green-100 rounded-r-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
