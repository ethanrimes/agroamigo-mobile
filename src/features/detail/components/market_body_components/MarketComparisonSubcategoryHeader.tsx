// src/features/detail/components/market_body_components/MarketComparisonSubcategoryHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface MarketComparisonSubcategoryHeaderProps {
  title: string;
}

const MarketComparisonSubcategoryHeader: React.FC<MarketComparisonSubcategoryHeaderProps> = ({
  title
}) => {
  const { typography, spacing } = useTheme();

  return (
    <View className="py-2 bg-background-tertiary border-b border-border-light">
      <Text 
        // style={typography.textStyles.body3Medium}
        className="text-text-secondary ml-4"
      >
        {title}
      </Text>
    </View>
  );
};

export default MarketComparisonSubcategoryHeader;