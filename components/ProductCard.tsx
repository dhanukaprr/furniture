import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-transparent">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Circular Add Button */}
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-white"
            aria-label="Add to cart"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div>
          <div className="flex justify-between items-start">
             <h3 className="text-base font-serif font-medium text-primary group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
             <span className="text-sm font-medium text-primary ml-2">${product.price}</span>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{product.category}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;