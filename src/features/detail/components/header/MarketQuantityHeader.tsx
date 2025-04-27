// src/features/detail/components/header/MarketQuantityHeader.tsx
import React from 'react';
import { View } from 'react-native';
import DetailHeader from './DetailHeader';

interface MarketQuantityHeaderProps {
  marketId?: string;
}

/**
 * Market Quantity specific header component
 * Extends the base DetailHeader with quantity-specific content for markets
 */
const MarketQuantityHeader: React.FC<MarketQuantityHeaderProps> = ({ 
  marketId 
}) => {
  return (
    <DetailHeader title="Cantidad Mercado">
      <View>
        {/* Market quantity specific header content will be added later */}
      </View>
    </DetailHeader>
  );
};

export default MarketQuantityHeader;