import React, { useState, useEffect } from 'react';
import { useOrderStatus } from '../hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle, Clock, ChefHat, Package, AlertCircle, Home } from 'lucide-react';
import { Order } from '../types';

interface OrderStatusProps {
  orderId: number;
  onBackToMenu: () => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ orderId, onBackToMenu }) => {
  const { order, loading } = useOrderStatus(orderId, 5000); // Poll every 5 seconds
  const [gracePeriodRemaining, setGracePeriodRemaining] = useState<number>(0);

  useEffect(() => {
    if (!order) return;

    const orderTime = new Date(order.createdAt).getTime();
    const gracePeriodMs = 5 * 60 * 1000; // 5 minutes
    const endTime = orderTime + gracePeriodMs;

    const updateGracePeriod = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      setGracePeriodRemaining(remaining);
    };

    updateGracePeriod();
    const interval = setInterval(updateGracePeriod, 1000);

    return () => clearInterval(interval);
  }, [order]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return {
          icon: <AlertCircle className="h-6 w-6 text-blue-500" />,
          title: 'Order Received',
          description: 'Your order has been received and is being reviewed.',
          color: 'bg-blue-50 border-blue-200'
        };
      case 'accepted':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: 'Order Accepted',
          description: 'Your order has been accepted and is being prepared.',
          color: 'bg-green-50 border-green-200'
        };
      case 'preparing':
        return {
          icon: <ChefHat className="h-6 w-6 text-orange-500" />,
          title: 'Being Prepared',
          description: 'Our kitchen is preparing your order.',
          color: 'bg-orange-50 border-orange-200'
        };
      case 'ready':
        return {
          icon: <Package className="h-6 w-6 text-purple-500" />,
          title: 'Ready for Pickup',
          description: order?.orderType === 'delivery' ? 'Your order is ready for delivery!' : 'Your order is ready for pickup!',
          color: 'bg-purple-50 border-purple-200'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-600" />,
          title: 'Order Complete',
          description: 'Your order has been completed. Thank you!',
          color: 'bg-green-50 border-green-200'
        };
      case 'cancelled':
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          title: 'Order Cancelled',
          description: 'Your order has been cancelled.',
          color: 'bg-red-50 border-red-200'
        };
      case 'rejected':
        return {
          icon: <AlertCircle className="h-6 w-6 text-red-500" />,
          title: 'Order Rejected',
          description: 'Unfortunately, we cannot fulfill your order at this time.',
          color: 'bg-red-50 border-red-200'
        };
      default:
        return {
          icon: <Clock className="h-6 w-6 text-gray-500" />,
          title: 'Processing',
          description: 'Your order is being processed.',
          color: 'bg-gray-50 border-gray-200'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order status...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Order not found</p>
          <Button onClick={onBackToMenu} className="mt-4">
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const isGracePeriodActive = gracePeriodRemaining > 0 && order.status === 'new';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Order #{order.id}</h1>
            <Button variant="ghost" onClick={onBackToMenu}>
              <Home className="h-5 w-5 mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Order Status */}
        <Card className={`border-2 ${statusInfo.color}`}>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {statusInfo.icon}
              <h2 className="text-2xl font-bold ml-3">{statusInfo.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{statusInfo.description}</p>
            
            {/* Grace Period Timer */}
            {isGracePeriodActive && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-yellow-800">Grace Period</h3>
                    <p className="text-sm text-yellow-700">
                      You can edit or cancel your order for the next {formatTime(gracePeriodRemaining)}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {formatTime(gracePeriodRemaining)}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="text-yellow-800 border-yellow-300">
                    Edit Order
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                    Cancel Order
                  </Button>
                </div>
              </div>
            )}

            {/* Estimated Time */}
            {(order.status === 'accepted' || order.status === 'preparing') && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800">Estimated Time</h3>
                <p className="text-sm text-blue-700">
                  {order.orderType === 'delivery' 
                    ? 'Your order will be delivered in approximately 25-35 minutes'
                    : 'Your order will be ready for pickup in approximately 15-20 minutes'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Customer</h4>
                  <p className="text-gray-600">{order.customerName}</p>
                  <p className="text-gray-600">{order.customerPhone}</p>
                  {order.customerEmail && (
                    <p className="text-gray-600">{order.customerEmail}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Order Type</h4>
                  <p className="text-gray-600 capitalize">{order.orderType}</p>
                  {order.deliveryAddress && (
                    <>
                      <h4 className="font-semibold text-gray-900 mt-2">Delivery Address</h4>
                      <p className="text-gray-600">{order.deliveryAddress}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <span className="font-medium">{item.quantity}x {item.itemNameAtOrder}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ${item.priceAtOrder.toFixed(2)} each
                        </span>
                      </div>
                      <span className="font-semibold">
                        ${(item.priceAtOrder * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 text-lg font-bold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="font-semibold text-gray-900">Payment Method</h4>
                <p className="text-gray-600 capitalize">{order.paymentMethod}</p>
              </div>

              {/* Order Time */}
              <div>
                <h4 className="font-semibold text-gray-900">Order Placed</h4>
                <p className="text-gray-600">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Need Help */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline">Call (555) 123-4567</Button>
              <Button variant="outline">Chat Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderStatus;