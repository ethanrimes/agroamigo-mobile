// src/features/selection/screens/InsumosSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';

const InsumosSelectionScreen: React.FC = () => {
  return (
    <SelectionScreen
      type="insumos"
      title="Insumos Agrícolas"
      location="Medellín, Antioquia"
    />
  );
};

export default InsumosSelectionScreen;