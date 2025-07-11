import { useState, useEffect } from 'react';
import { Order, CreateOrderData } from '../types';
import api from '../lib/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/orders', orderData);
      const newOrder = response.data;
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrder = async (orderId: number): Promise<Order | null> => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching order:', err);
      return null;
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order['status']): Promise<Order | null> => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      const updatedOrder = response.data;
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      return updatedOrder;
    } catch (err: any) {
      console.error('Error updating order status:', err);
      return null;
    }
  };

  const cancelOrder = async (orderId: number): Promise<boolean> => {
    try {
      await api.delete(`/orders/${orderId}`);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      ));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to cancel order';
      setError(errorMessage);
      return false;
    }
  };

  const fetchOrders = async (status?: Order['status']) => {
    try {
      setLoading(true);
      setError(null);
      const url = status ? `/orders?status=${status}` : '/orders';
      const response = await api.get(url);
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchOrder,
    updateOrderStatus,
    cancelOrder,
    fetchOrders,
  };
};

export const useOrderStatus = (orderId: number, pollInterval = 5000) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order status:', err);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderStatus();

    // Set up polling for real-time updates
    const interval = setInterval(fetchOrderStatus, pollInterval);

    return () => clearInterval(interval);
  }, [orderId, pollInterval]);

  return { order, loading };
};