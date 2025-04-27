// src/features/detail/screens/MarketDetailScreen.tsx
import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { MercadoPrecioScreen, MercadoCantidadScreen } from './priceQuantityViews';

/**
 * Container component that determines which market screen to display
 * based on the URL parameters
 */
const MarketDetailScreen: React.FC = () => {
  const { view = 'price' } = useLocalSearchParams<{ view?: string }>();
  
  // Determine which screen to show based on view parameter
  const isPriceView = view === 'price';
  
  return isPriceView ? <MercadoPrecioScreen /> : <MercadoCantidadScreen />;
};

export default MarketDetailScreen;