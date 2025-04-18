// src/features/detail/components/header/PriceDetailHeaderFooters.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface PriceDetailHeaderFootersProps {
  data: any;
  type: 'producto' | 'insumo' | 'mercado';
}

const PriceDetailHeaderFooters: React.FC<PriceDetailHeaderFootersProps> = ({ data, type }) => {
  const { typography } = useTheme();
  const isMarket = type === 'mercado';
  
  // Format the context message based on the page type
  const getContextMessage = () => {
    if (isMarket) {
      return 'Precio 5 abril entre mercados';
    } else {
      return `Precio ${data.observationDate || '5 abril'} entre mercados`;
    }
  };
  
  return (
    <View className="mt-1 mb-2">
      <Text 
        //   style={typography.textStyles.headline4}
        className="text-white font-semibold"
      >
        {getContextMessage()}
      </Text>
    </View>
  );
};

export default PriceDetailHeaderFooters;