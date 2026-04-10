import React from 'react';
import { useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { mockProducts, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const [sortBy, setSortBy] = React.useState('popular');
  
  const category = categories.find(c => c.id === id);
  const title = id === 'all' ? 'All Products' : category?.name || 'Category';
  
  let products = id === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === id);

  // Apply sorting
  products = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // popular (default)
  });

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500">{products.length} products found</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors md:hidden">
              <Filter className="w-4 h-4" /> Filters
            </button>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="cat" className="text-green-600 focus:ring-green-500" defaultChecked={id === 'all'} />
                    <span className="text-gray-700">All Products</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="cat" className="text-green-600 focus:ring-green-500" defaultChecked={id === cat.id} />
                      <span className="text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500" />
                  <span className="text-gray-500">-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500" />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" defaultChecked />
                  <span className="text-gray-700">In Stock</span>
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
