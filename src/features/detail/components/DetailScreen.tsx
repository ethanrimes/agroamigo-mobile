// src/features/detail/components/DetailScreen.tsx
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRouterNavigation } from '@/src/hooks';
import { useDetailProductoInsumoData } from '../hooks/useDetailProductoInsumoData';
import { useMarketData } from '../hooks/useMarketData';
import DetailPageHeader from './header/DetailPageHeader';
import ProductoInsumoContent from './ProductoInsumoContent';
import MarketComparisonTable from './MarketComparisonTable';

interface DetailScreenProps {
  id: string;
  type: 'producto' | 'insumo' | 'mercado';
}

const DetailScreen: React.FC<DetailScreenProps> = ({ id, type }) => {
  const { currentPath } = useRouterNavigation();
  const isMarket = type === 'mercado';
  
  // Use the appropriate data hook based on the type
  const productoInsumoData = !isMarket ? useDetailProductoInsumoData(id, type) : null;
  const marketData = isMarket ? useMarketData(id) : null;
  
  // The data to use for rendering
  const data = isMarket ? marketData : productoInsumoData;

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header Section with green background */}
      <DetailPageHeader 
        data={data} 
        type={type}
      />
      
      {/* Body Content */}
      <ScrollView className="flex-1">
        {isMarket ? (
          // Market comparison table
          <MarketComparisonTable marketData={marketData} />
        ) : (
          // Producto or Insumo content
          <ProductoInsumoContent 
            data={data}
            type={type}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default DetailScreen;