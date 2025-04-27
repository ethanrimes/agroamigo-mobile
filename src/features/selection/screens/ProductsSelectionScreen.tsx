// src/features/selection/screens/ProductsSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';
import { useProductData } from '../hooks/useProductData';

/**
 * Products selection screen that implements the shared sliding side drawer
 * for filtering agricultural products.
 */
const ProductsSelectionScreen: React.FC = () => {
  // Fetch product data with the dedicated hook
  const { data, loading, error } = useProductData();

  return (
    <SelectionScreen
      type="products"
      title="Productos Agrícolas"
      location="Medellín, Antioquia"
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default ProductsSelectionScreen;