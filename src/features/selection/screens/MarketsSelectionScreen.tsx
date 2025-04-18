// src/features/selection/screens/MarketsSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';

const MarketsSelectionScreen: React.FC = () => {
  return (
    <SelectionScreen
      type="markets"
      title="Mercados"
      location="Medellín, Antioquia"
    />
  );
};

export default MarketsSelectionScreen;