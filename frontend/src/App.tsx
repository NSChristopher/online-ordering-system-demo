import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './hooks/useCart';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';

type AppScreen = 'menu' | 'checkout' | 'order-status';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('menu');
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  const handleCheckout = () => {
    setCurrentScreen('checkout');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
    setCurrentOrderId(null);
  };

  const handleOrderPlaced = (orderId: number) => {
    setCurrentOrderId(orderId);
    setCurrentScreen('order-status');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <Menu onCheckout={handleCheckout} />;
      case 'checkout':
        return (
          <Checkout 
            onBack={handleBackToMenu} 
            onOrderPlaced={handleOrderPlaced}
          />
        );
      case 'order-status':
        return currentOrderId ? (
          <OrderStatus 
            orderId={currentOrderId} 
            onBackToMenu={handleBackToMenu}
          />
        ) : (
          <Navigate to="/" replace />
        );
      default:
        return <Menu onCheckout={handleCheckout} />;
    }
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={renderCurrentScreen()} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;