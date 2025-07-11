import React, { useState } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useCart } from '../hooks/useCart';
import { MenuItem, MenuCategory } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Plus, ShoppingCart, Search, Store, Clock } from 'lucide-react';
import { toast } from 'sonner';
import CartDrawer from '../components/CartDrawer';

interface MenuProps {
  onCheckout: () => void;
}

const Menu: React.FC<MenuProps> = ({ onCheckout }) => {
  const { categories, loading, error } = useMenu();
  const { addItem, itemCount, total } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = React.useMemo(() => {
    let items = categories.flatMap(category => category.items || []);
    
    if (selectedCategory) {
      items = items.filter(item => item.menuCategoryId === selectedCategory);
    }
    
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return items;
  }, [categories, selectedCategory, searchTerm]);

  const handleAddToCart = (menuItem: MenuItem, quantity = 1) => {
    addItem(menuItem, quantity);
    toast.success(`Added ${menuItem.name} to cart`);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading menu: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Demo Bistro</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Open: Mon-Thu 11AM-9PM, Fri-Sat 11AM-10PM</span>
                </div>
              </div>
            </div>
            
            {/* Cart button */}
            <Button 
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="whitespace-nowrap"
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleItemClick(item)}
              >
                <CardHeader className="p-0">
                  {item.imageUrl && (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                        }}
                      />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                    <span className="text-lg font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  {item.description && (
                    <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </CardDescription>
                  )}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Persistent Cart Bar */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <span className="font-semibold">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
              <span className="ml-2">${total.toFixed(2)}</span>
            </div>
            <Button 
              variant="secondary"
              onClick={handleCartClick}
            >
              View Cart →
            </Button>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {selectedItem.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
            <p className="text-gray-600 mb-4">{selectedItem.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-blue-600">${selectedItem.price.toFixed(2)}</span>
              <Button onClick={() => handleAddToCart(selectedItem)}>
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedItem(null)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Menu;