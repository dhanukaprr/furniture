import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { getProductStylingTips } from '../services/geminiService';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [stylingTips, setStylingTips] = useState<string | null>(null);
  const [isLoadingTips, setIsLoadingTips] = useState(false);

  useEffect(() => {
    // Reset state when product changes
    setStylingTips(null);
    if(product) setActiveImage(product.image);
  }, [id, product]);

  const handleGenerateTips = async () => {
    if (!product) return;
    setIsLoadingTips(true);
    const tips = await getProductStylingTips(product.name, product.description);
    setStylingTips(tips);
    setIsLoadingTips(false);
  };

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl">Product not found.</p>
        <Link to="/shop" className="text-accent ml-2 underline">Go back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {/* Thumbnails (Simulated variations for demo) */}
          <div className="grid grid-cols-4 gap-4">
            {[product.image, `https://picsum.photos/seed/${product.id}a/800/800`, `https://picsum.photos/seed/${product.id}b/800/800`].map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${activeImage === img ? 'border-accent' : 'border-transparent'}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2">
             <Link to="/shop" className="text-gray-400 text-sm hover:text-primary mb-2 inline-block">← Back to Shop</Link>
             <p className="text-accent text-sm font-bold uppercase tracking-widest">{product.category}</p>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-medium text-primary">${product.price.toLocaleString()}</span>
            <div className="flex items-center text-yellow-400">
               <Star fill="currentColor" size={18} />
               <span className="ml-1 text-gray-600 text-sm font-medium">{product.rating} (128 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-primary text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
            >
              Add to Cart
            </button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
               <span className="flex items-center"><Truck size={16} className="mr-2" /> Free Shipping</span>
               <span className="flex items-center"><ShieldCheck size={16} className="mr-2" /> 5-Year Warranty</span>
            </div>
          </div>

          {/* AI Styling Feature */}
          <div className="mt-auto bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-lg flex items-center">
                <Sparkles size={18} className="text-accent mr-2" /> 
                AI Styling Guide
              </h3>
              {!stylingTips && !isLoadingTips && (
                <button 
                  onClick={handleGenerateTips}
                  className="text-xs font-bold text-accent uppercase tracking-wider border border-accent px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-all"
                >
                  Generate Tips
                </button>
              )}
            </div>
            
            <div className="min-h-[100px] text-sm text-gray-600">
              {isLoadingTips ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : stylingTips ? (
                <div className="prose prose-sm prose-p:my-1 prose-ul:pl-4">
                   {/* We might get markdown back, but for simplicity display as plain text or pre-formatted */}
                   <pre className="whitespace-pre-wrap font-sans text-gray-600">{stylingTips}</pre>
                </div>
              ) : (
                <p>Wondering how to style this? Click generate to get personalized advice from our AI.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
