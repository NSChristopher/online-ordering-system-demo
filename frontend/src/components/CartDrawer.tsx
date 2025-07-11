import React from 'react';
import { useCart } from '../hooks/useCart';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeItem, total, itemCount, clearCart } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (menuItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(menuItemId);
    } else {
      updateQuantity(menuItemId, newQuantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Add some items to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((cartItem) => (
                <Card key={cartItem.menuItem.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      {cartItem.menuItem.imageUrl && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={cartItem.menuItem.imageUrl}
                            alt={cartItem.menuItem.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{cartItem.menuItem.name}</h3>
                        <p className="text-blue-600 font-bold text-sm">
                          ${cartItem.menuItem.price.toFixed(2)} each
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(cartItem.menuItem.id, cartItem.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {cartItem.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(cartItem.menuItem.id, cartItem.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">
                              ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(cartItem.menuItem.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={onCheckout} className="w-full" size="lg">
                Proceed to Checkout
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;