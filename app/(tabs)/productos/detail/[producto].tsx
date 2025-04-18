// Import needed for app/tabs/productos/detail/[producto].tsx
import React from 'react';
import { Stack } from 'expo-router';
import ProductDetailScreen from '@/src/features/detail/screens/ProductDetailScreen';

const ProductoDetailPage = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ProductDetailScreen />
    </>
  );
};

export default ProductoDetailPage;