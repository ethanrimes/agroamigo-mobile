// src/features/selection/screens/InsumosSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';
import { useProductData } from '../hooks/useProductData'; // Dummy data for now

const InsumosSelectionScreen: React.FC = () => {
  // Pass empty data as specified
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