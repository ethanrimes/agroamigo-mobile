// src/features/detail/components/ProductoInsumoContent.tsx
import React from 'react';
import { View } from 'react-native';
import PriceDistributionHistogram from './producto_insumo_body/PriceDistributionHistogram';
import HistoricalPriceLinegraph from './producto_insumo_body/HistoricalPriceLinegraph';
import AIInsights from './producto_insumo_body/AIInsights';

interface ProductoInsumoContentProps {
  data: any;
  type: 'producto' | 'insumo';
}

const ProductoInsumoContent: React.FC<ProductoInsumoContentProps> = ({ data, type }) => {
  return (
    <View className="flex-1 p-4">
      {/* Histogram Section */}
      <PriceDistributionHistogram data={data.priceDistribution} />
      
      {/* Line Graph Section */}
      <HistoricalPriceLinegraph data={data.historicalPrices} />
      
      {/* AI Insights Section */}
      <AIInsights insights={data.aiInsights} />
    </View>
  );
};

export default ProductoInsumoContent;