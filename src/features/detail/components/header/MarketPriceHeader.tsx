// src/features/detail/components/header/MarketPriceHeader.tsx
import React from 'react';
import { View } from 'react-native';
import DetailHeader from './DetailHeader';

interface MarketPriceHeaderProps {
  marketId?: string;
}

/**
 * Market Price specific header component
 * Extends the base DetailHeader with price-specific content for markets
 */
const MarketPriceHeader: React.FC<MarketPriceHeaderProps> = ({ 
  marketId 
}) => {
  return (
    <DetailHeader title="Precio Mercado">
      <View>
        {/* Market price specific header content will be added later */}
      </View>
    </DetailHeader>
  );
};

export default MarketPriceHeader;