// src/features/home/hooks/useHomeActions.ts
import { useState, useCallback, useEffect } from 'react';

// Define the types
interface SavedPriceItem {
  artiId: number;
  artiNombre: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  origin?: string;
}

export const useHomeActions = () => {
  // State to track the current featured item index
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  
  // Function to get a random featured price item
  const getRandomFeaturedPriceItem = useCallback((items: SavedPriceItem[]) => {
    if (!items || items.length === 0) {
      return null;
    }
    
    // If there's only one item, return it
    if (items.length === 1) {
      return items[0];
    }
    
    // Return either a single item or the whole array for transition
    // Depending on the use case, you might want to return all items
    // for the FeaturePriceTransition component
    return items;
  }, []);
  
  // Function to navigate to product detail
  const navigateToProductDetail = useCallback((artiId: number) => {
    // This would use navigation in a real app
    console.log('Navigate to product detail:', artiId);
    // router.push(`/products/${artiId}`);
  }, []);
  
  // Function to toggle saving a product
  const toggleSaveProduct = useCallback((artiId: number, isSaved: boolean) => {
    console.log('Toggle save product:', artiId, isSaved ? 'unsave' : 'save');
    // In a real app, this would update the state and possibly make an API call
    return !isSaved;
  }, []);
  
  return {
    getRandomFeaturedPriceItem,
    navigateToProductDetail,
    toggleSaveProduct,
    currentFeaturedIndex,
  };
};

export default useHomeActions;