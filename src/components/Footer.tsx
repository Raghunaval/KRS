import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-6">
              <Leaf className="w-8 h-8 text-green-500" />
              <span className="font-bold text-2xl tracking-tight">Fresh<span className="text-green-500">Mart</span></span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for fresh, organic, and high-quality groceries delivered right to your doorstep in 30 minutes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/category/fruits-vegetables" className="hover:text-green-400 transition-colors">Shop Groceries</Link></li>
              <li><Link to="/faq" className="hover:text-green-400 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-green-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/category/fruits-vegetables" className="hover:text-green-400 transition-colors">Fruits & Vegetables</Link></li>
              <li><Link to="/category/dairy-eggs" className="hover:text-green-400 transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/category/snacks" className="hover:text-green-400 transition-colors">Snacks</Link></li>
              <li><Link to="/category/beverages" className="hover:text-green-400 transition-colors">Beverages</Link></li>
              <li><Link to="/category/household" className="hover:text-green-400 transition-colors">Household Items</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>123 Market Street, Foodville, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                <span>support@freshmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FreshMart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Mock Payment Icons */}
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
            <div className="h-8 w-12 bg-gray-800 rounded flex items-center justify-center text-[10px] font-bold">AMEX</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
