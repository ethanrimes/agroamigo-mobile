// src/features/detail/components/market_body_components/MarketComparisonTableEntry.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import HStack from '@/src/components/ui/layout/HStack';
import { MarketData } from '../../hooks/useMarketData';

interface MarketComparisonTableEntryProps {
  product: MarketData['productComparisons'][0];
}

const MarketComparisonTableEntry: React.FC<MarketComparisonTableEntryProps> = ({
  product
}) => {
  const { colors, typography, spacing } = useTheme();

  // Format price to include thousands separator
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // Determine text color based on difference percentage
  const getDifferenceColor = () => {
    if (product.difference > 0) {
      return colors.action.error; // Red for positive difference (more expensive)
    } else if (product.difference < 0) {
      return colors.action.success; // Green for negative difference (cheaper)
    }
    return colors.text.primary; // Default color
  };

  // Get product name with unit if available
  const getDisplayName = () => {
    if (product.unit) {
      return `${product.productName} - ${product.unit}`;
    }
    return product.productName;
  };

  return (
    <View className="py-3 border-b border-border-light">
      <HStack className="items-center justify-between">
        {/* Product Name */}
        <View style={{ flex: 2 }}>
          <Text 
            // style={typography.textStyles.body3}
            className="text-text-primary"
          >
            {getDisplayName()}
          </Text>
        </View>
        
        {/* First Market Price */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            // style={typography.textStyles.body3}
            className="text-text-primary"
          >
            {formatPrice(product.localPrice)}
          </Text>
        </View>
        
        {/* Second Market Price */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            // style={typography.textStyles.body3}
            className="text-text-primary"
          >
            {formatPrice(product.referencePrice)}
          </Text>
        </View>
        
        {/* Difference Percentage */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            style={[
            //   typography.textStyles.body3Medium, 
              { color: getDifferenceColor() }
            ]}
          >
            {product.difference > 0 ? '+' : ''}{product.difference.toFixed(1)}%
          </Text>
        </View>
      </HStack>
    </View>
  );
};

export default MarketComparisonTableEntry;