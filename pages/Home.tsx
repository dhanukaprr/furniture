import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  // Mock data for featured section to match image
  const products = PRODUCTS;

  return (
    <div className="w-full bg-background min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-8 pb-20 md:pb-32">
        
        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-serif text-primary leading-[0.9] md:leading-[0.9] mb-12 animate-fade-in-up">
          Modern Living <br />
          <span className="ml-0 md:ml-0">Perfected</span>
        </h1>

        <div className="flex flex-col md:flex-row relative">
          
          {/* Left Column: Description & CTA */}
          <div className="md:w-1/3 pt-4 md:pt-12 z-20 relative">
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-sm animate-fade-in-up delay-100">
              Thoughtfully designed furniture that blends comfort, craftsmanship, and timeless style—made for today’s spaces.
            </p>
            <Link 
              to="/shop" 
              className="inline-block bg-accent text-white px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-primary transition-colors animate-fade-in-up delay-200"
            >
              Discover More
            </Link>
          </div>

          {/* Right Column: Hero Image & Floating Elements */}
          <div className="md:w-2/3 relative mt-12 md:mt-0 flex justify-center md:justify-end">
             
             {/* Main Hero Chair */}
             <div className="relative z-10 w-full max-w-lg">
                <img 
                  src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop" 
                  alt="Modern Chair" 
                  className="w-full h-auto object-contain drop-shadow-2xl rounded-xl"
                />
                
                {/* Floating Arrow Button */}
                <Link to="/shop" className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-accent text-white p-6 rounded-full hover:scale-110 transition-transform shadow-xl z-20">
                  <ArrowUpRight size={32} />
                </Link>
             </div>

             {/* Rating Badge (Top Right) */}
             <div className="absolute top-0 right-0 text-right z-0 hidden md:block">
               <div className="flex items-center justify-end text-4xl font-serif text-primary">
                 4.8/5 <Star className="text-gold ml-2 fill-current" size={24} />
               </div>
               <p className="text-gray-500 text-xs mt-1 w-32 ml-auto leading-tight">
                 Based on 12,000+ verified customer reviews
               </p>
             </div>

             {/* Stock Counter (Bottom Right) */}
             <div className="absolute bottom-10 -right-4 md:right-0 text-right z-20 hidden md:block">
               <span className="text-5xl font-serif text-primary block">500+</span>
               <span className="text-gray-500 text-xs tracking-widest uppercase">Products <br/> in stock</span>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Collection - Overlapping Grid */}
      <section className="bg-background pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 relative">
            
            {/* 1. Chair Left (Overlapping) */}
            <div className="md:col-span-4 relative z-20 md:-mb-12 md:mt-[-80px] px-4 md:px-0">
               <img 
                 src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" 
                 alt="Velvet Armchair" 
                 className="w-full h-auto object-cover rounded-lg shadow-xl"
               />
            </div>

            {/* 2. Dark Brown Info Box */}
            <div className="md:col-span-4 bg-accent text-white p-8 md:p-12 flex flex-col justify-center relative z-10 -mt-4 md:mt-0 rounded-lg md:rounded-none">
               <h2 className="text-3xl md:text-4xl font-serif mb-2 leading-tight">
                 Modern Oak <br/> Wood Sofa
               </h2>
               <div className="mt-8 text-right">
                  <Link to="/shop" className="text-xs font-bold tracking-widest uppercase underline hover:text-gray-300">
                    Shop Now
                  </Link>
               </div>
            </div>

            {/* 3. Nightstand Right */}
            <div className="md:col-span-4 relative bg-[#EBE9E4] md:bg-transparent flex items-end">
               <div className="absolute top-8 left-8 md:-left-12 z-20">
                 <h3 className="text-2xl font-serif text-white md:text-primary leading-tight drop-shadow-md md:drop-shadow-none">
                   Nightstand <br/> Chic In <br/> Bedroom Decor
                 </h3>
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1532372576444-dda954194ad0?q=80&w=800&auto=format&fit=crop" 
                 alt="Nightstand" 
                 className="w-full h-64 md:h-full object-cover md:rounded-r-lg"
               />
            </div>

          </div>
        </div>
      </section>

      {/* Product Grid Header */}
      <section className="py-12 max-w-7xl mx-auto px-6">
         <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif font-bold text-primary">New Arrivals</h2>
            <Link to="/shop" className="text-sm font-medium underline hover:text-gray-600">View All</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
         </div>
      </section>
    </div>
  );
};

export default Home;