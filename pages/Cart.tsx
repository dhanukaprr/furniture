import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen,
    clearCart 
  } = useCart();

  // We are implementing this as a slide-over/drawer, but for the route component, 
  // we can just render the logic if we were on a dedicated page. 
  // However, the common pattern in e-commerce is a drawer.
  // The logic below renders the drawer overlay.

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-xl flex flex-col animate-slide-in-right">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-xl font-serif font-bold text-primary flex items-center">
              <ShoppingBag className="mr-2" size={20} /> Your Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag size={32} />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                  <p className="text-gray-500 text-sm">Looks like you haven't found anything yet.</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-accent font-medium hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-primary line-clamp-1">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                       <div className="flex items-center border border-gray-200 rounded-md">
                         <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                         >
                           <Minus size={14} />
                         </button>
                         <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                         <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600"
                         >
                           <Plus size={14} />
                         </button>
                       </div>
                       <p className="font-medium text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-100 p-6 bg-gray-50 space-y-4">
              <div className="flex justify-between text-base font-medium text-primary">
                <p>Subtotal</p>
                <p>${cartTotal.toLocaleString()}</p>
              </div>
              <p className="text-xs text-gray-500 text-center">Shipping and taxes calculated at checkout.</p>
              <button 
                onClick={() => { alert('Checkout functionality coming soon!'); clearCart(); setIsCartOpen(false); }}
                className="w-full bg-primary text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
