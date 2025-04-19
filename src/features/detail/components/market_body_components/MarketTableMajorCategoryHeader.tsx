// src/features/detail/components/market_body_components/MarketTableMajorCategoryHeader.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import HStack from '@/src/components/ui/layout/HStack';

interface MarketTableMajorCategoryHeaderProps {
  title: string;
  diffPercentage: string;
}

const MarketTableMajorCategoryHeader: React.FC<MarketTableMajorCategoryHeaderProps> = ({
  title,
  diffPercentage
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Determine text color based on difference percentage
  const getDifferenceColor = () => {
    // Remove % sign and convert to number
    const numericDiff = parseFloat(diffPercentage.replace('%', ''));
    
    if (numericDiff > 0) {
      return colors.action.error; // Red for positive difference (more expensive)
    } else if (numericDiff < 0) {
      return colors.action.success; // Green for negative difference (cheaper)
    }
    return colors.text.primary; // Default color
  };

  return (
    <View className="py-3 px-4 bg-background-secondary rounded-t-lg">
      <HStack className="justify-between items-center">
        <Text 
          // style={typography.textStyles.body2Medium}
          className="text-text-primary"
        >
          {title}
        </Text>
        
        <Text 
          style={[
            // typography.textStyles.body2Medium, 
            { color: getDifferenceColor() }
          ]}
        >
          {diffPercentage}
        </Text>
      </HStack>
    </View>
  );
};

export default MarketTableMajorCategoryHeader;