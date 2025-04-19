// src/features/detail/components/market_body_components/MarketComparisonTableColumnTitles.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import HStack from '@/src/components/ui/organization/HStack';

interface MarketComparisonTableColumnTitlesProps {
  marketNames: string[];
}

const MarketComparisonTableColumnTitles: React.FC<MarketComparisonTableColumnTitlesProps> = ({
  marketNames
}) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View className="py-3 border-b border-border-light">
      <HStack className="items-center justify-between">
        {/* Product Column */}
        <View style={{ flex: 2 }}>
          <Text 
            // style={typography.textStyles.body3Medium}
            className="text-text-primary"
          >
            Producto
          </Text>
        </View>
        
        {/* First Market Column */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            // style={typography.textStyles.body3Medium}
            className="text-text-primary"
          >
            {marketNames[0]}
          </Text>
        </View>
        
        {/* Second Market Column */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            // style={typography.textStyles.body3Medium}
            className="text-text-primary"
          >
            {marketNames[1]}
          </Text>
        </View>
        
        {/* Difference Column */}
        <View style={{ flex: 1 }} className="items-center">
          <Text 
            // style={typography.textStyles.body3Medium}
            className="text-text-primary"
          >
            Diferencia
          </Text>
        </View>
      </HStack>
    </View>
  );
};

export default MarketComparisonTableColumnTitles;