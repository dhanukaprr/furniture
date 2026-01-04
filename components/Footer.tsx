import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">Lumina</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting homes with timeless elegance and modern functionality. We believe your space should tell your story.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent">Living Room</a></li>
              <li><a href="#" className="hover:text-accent">Bedroom</a></li>
              <li><a href="#" className="hover:text-accent">Dining</a></li>
              <li><a href="#" className="hover:text-accent">Office</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-accent">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-accent">Returns</a></li>
              <li><a href="#" className="hover:text-accent">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">Subscribe to receive design tips and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent w-full"
              />
              <button className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Lumina Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
