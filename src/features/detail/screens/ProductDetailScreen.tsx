// src/features/detail/screens/ProductDetailScreen.tsx
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProductoPrecioScreen, ProductoCantidadScreen } from './priceQuantityViews';

/**
 * Container component that determines which product screen to display
 * based on the URL parameters
 */
const ProductDetailScreen: React.FC = () => {
  const { view = 'price' } = useLocalSearchParams<{ view?: string }>();
  
  // Determine which screen to show based on view parameter
  const isPriceView = view === 'price';
  
  return isPriceView ? <ProductoPrecioScreen /> : <ProductoCantidadScreen />;
};

export default ProductDetailScreen;