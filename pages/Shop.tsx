import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';

const categories: Category[] = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Lighting'];

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Our Collection</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our meticulously crafted furniture pieces, designed to bring comfort and style to every corner of your home.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-100 gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center space-x-2">
           <Filter size={18} className="text-gray-400" />
           <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border-none bg-transparent text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
           >
             <option value="featured">Featured</option>
             <option value="low-high">Price: Low to High</option>
             <option value="high-low">Price: High to Low</option>
           </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
