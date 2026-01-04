import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'COLLECTIONS', path: '/shop' }, // Pointing to shop for demo
    { name: 'OUR STORY', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#F4F2EE]/90 backdrop-blur-sm pt-4 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-10 w-1/4">
             <div className="bg-primary text-white p-1 rounded-sm">
               <Home size={16} />
            </div>
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">Lumina</span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex justify-center space-x-12 w-2/4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs font-medium tracking-widest text-primary hover:text-gray-600 transition-colors uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons - Right Aligned */}
          <div className="flex items-center justify-end space-x-6 w-1/4">
             {/* Mobile Menu Button */}
             <button 
              className="md:hidden text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 text-primary hover:opacity-70 transition-opacity"
            >
              <div className="bg-accent text-white rounded-full p-2">
                 <ShoppingBag size={16} />
              </div>
              <span className="text-xs font-medium tracking-wide uppercase hidden sm:block">Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F4F2EE] border-t border-gray-200 absolute w-full left-0 animate-fade-in-down shadow-lg">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium tracking-widest text-primary uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;