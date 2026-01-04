import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AIChatBot from './components/AIChatBot';
import { CartProvider } from './context/CartContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Cart /> {/* Render Cart Overlay globally */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              {/* Fallback for other routes */}
              <Route path="*" element={<div className="p-20 text-center">Page not found</div>} />
            </Routes>
          </main>
          <AIChatBot />
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
