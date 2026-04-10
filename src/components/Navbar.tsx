import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Leaf } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const cartCount = useStore(state => state.getCartCount());
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/90 backdrop-blur-md py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-green-600">
          <Leaf className="w-8 h-8" />
          <span className="font-bold text-2xl tracking-tight text-gray-900">Fresh<span className="text-green-600">Mart</span></span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input 
            type="text" 
            placeholder="Search for groceries, vegetables, meat..." 
            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-full transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/account" className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Account</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors">
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Wishlist</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-green-600 transition-colors relative group">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-xs font-medium">Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative text-gray-800">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 p-1"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Search - Visible only on mobile when scrolled or always */}
      <div className="md:hidden px-4 pb-3 pt-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search groceries..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/category/fruits-vegetables" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-800 py-2 border-b border-gray-50">Fruits & Vegetables</Link>
              <Link to="/category/dairy-eggs" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-800 py-2 border-b border-gray-50">Dairy & Eggs</Link>
              <Link to="/category/snacks" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-800 py-2 border-b border-gray-50">Snacks</Link>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-800 py-2 border-b border-gray-50 flex items-center gap-2"><User className="w-5 h-5"/> My Account</Link>
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="font-medium text-gray-800 py-2 flex items-center gap-2"><Heart className="w-5 h-5"/> Wishlist</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
