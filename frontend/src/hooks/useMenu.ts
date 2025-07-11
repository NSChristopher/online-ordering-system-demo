import { useState, useEffect } from 'react';
import { MenuCategory, MenuItem } from '../types';
import api from '../lib/api';

export const useMenu = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/menu/categories');
      setCategories(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load menu');
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const searchItems = async (searchTerm: string) => {
    try {
      const response = await api.get(`/menu/items?search=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (err: any) {
      console.error('Error searching menu items:', err);
      return [];
    }
  };

  const getItemsByCategory = (categoryId: number): MenuItem[] => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.items || [];
  };

  const getAllItems = (): MenuItem[] => {
    return categories.flatMap(category => category.items || []);
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchMenu,
    searchItems,
    getItemsByCategory,
    getAllItems,
  };
};