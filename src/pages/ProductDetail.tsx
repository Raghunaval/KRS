import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, Shield, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, wishlist, toggleWishlist } = useStore();
  
  const product = mockProducts.find(p => p.id === id);
  const relatedProducts = mockProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  
  if (!product) {
    return <div className="min-h-screen pt-24 text-center">Product not found</div>;
  }

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-gray-50 rounded-3xl p-8 relative flex items-center justify-center">
            {product.originalPrice && (
              <span className="absolute top-6 left-6 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
            <div className="absolute top-6 right-6 flex flex-col gap-3">
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 shadow-sm transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-green-600 font-medium mb-2">{product.brand}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
                <Star className="w-4 h-4 fill-green-700" />
                {product.rating}
              </div>
              <span className="text-gray-500 text-sm">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <div className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
              {product.originalPrice && (
                <div className="text-xl text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</div>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <span className="text-gray-900 font-medium block mb-2">Weight / Quantity</span>
              <div className="inline-block border border-green-500 text-green-700 bg-green-50 px-4 py-2 rounded-lg font-medium">
                {product.weight}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {quantity > 0 ? (
                <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2 w-full sm:w-40">
                  <button 
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-700 hover:text-green-600 shadow-sm"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-700 hover:text-green-600 shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => addToCart(product, 1)}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors disabled:opacity-50"
                >
                  Add to Cart
                </button>
              )}
              <button 
                onClick={() => {
                  if (quantity === 0) addToCart(product, 1);
                  navigate('/checkout');
                }}
                disabled={!product.inStock}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-colors disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-green-600" />
                <span className="text-sm text-gray-600">Delivery in 30 mins</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <span className="text-sm text-gray-600">Freshness Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
