// src/features/selection/screens/ProductsSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';

const ProductsSelectionScreen: React.FC = () => {
  return (
    <SelectionScreen
      type="products"
      title="Productos Agrícolas"
      location="Medellín, Antioquia"
    />
  );
};

export default ProductsSelectionScreen;