// src/features/detail/components/header/CurrentPriceDetail.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import HStack from '@/src/components/ui/organization/HStack';

interface CurrentPriceDetailProps {
  data: any;
  type: 'producto' | 'insumo' | 'mercado';
}

const CurrentPriceDetail: React.FC<CurrentPriceDetailProps> = ({ data, type }) => {
  const { typography, colors } = useTheme();
  const isMarket = type === 'mercado';
  
  // Format the price display
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };
  
  // Price comparison text for market type
  const getPriceComparisonText = () => {
    if (!isMarket || !data.priceComparison) return '';
    
    const { percentage, isExpensive } = data.priceComparison;
    return `${percentage}% más ${isExpensive ? 'caro' : 'barato'} de`;
  };
  
  return (
    <View className="mb-4">
      <HStack space="sm" className="items-center mb-1">
        {/* Product/Input Icon */}
        <View className="w-12 h-12 justify-center items-center rounded-full bg-white">
          <Image 
            source={data.icon} 
            style={{ width: 32, height: 32 }}
          />
        </View>
        
        {/* Name */}
        <Text 
        //   style={typography.textStyles.headline3}
          className="text-white font-semibold"
        >
          {data.name}
        </Text>
      </HStack>
      
      {/* Price Display */}
      <View className="mb-1">
        {isMarket ? (
          <Text className="text-white text-5xl font-bold">
            {getPriceComparisonText()}
          </Text>
        ) : (
          <Text className="text-white text-5xl font-bold">
            {formatPrice(data.currentPrice)}
          </Text>
        )}
      </View>
      
      {/* Unit of Measurement and Date */}
      <HStack space="xs" className="items-center">
        <Text className="text-white text-lg">
          {!isMarket && `/ ${data.unit || 'unidad'}`}
        </Text>
        
        <Text className="text-white text-lg ml-4">
          {data.observationDate || '5 abril, 2025'}
        </Text>
      </HStack>
    </View>
  );
};

export default CurrentPriceDetail;
