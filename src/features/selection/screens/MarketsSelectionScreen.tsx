// src/features/selection/screens/MarketsSelectionScreen.tsx
import React from 'react';
import SelectionScreen from '../components/SelectionScreen';
import { useMarketData } from '../hooks/useMarketData';

/**
 * Markets selection screen that uses the shared sliding side drawer for filtering
 */
const MarketsSelectionScreen: React.FC = () => {
  // Fetch market data with the dedicated hook
  const { data, loading, error } = useMarketData();

  return (
    <SelectionScreen
      type="markets"
      title="Mercados"
      location="Medellín, Antioquia"
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default MarketsSelectionScreen;