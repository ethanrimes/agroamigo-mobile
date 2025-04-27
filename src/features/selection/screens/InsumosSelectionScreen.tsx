// src/features/selection/screens/InsumosSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';
import { useProductData } from '../hooks/useProductData'; // Using product data hook for now

/**
 * Insumos selection screen that uses the shared sliding side drawer for filtering
 */
const InsumosSelectionScreen: React.FC = () => {
  // Pass empty data as specified (using product data as a placeholder)
  const { data, loading, error } = useProductData();

  return (
    <SelectionScreen
      type="insumos"
      title="Insumos Agrícolas"
      location="Medellín, Antioquia"
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default InsumosSelectionScreen;