// src/features/detail/screens/MarketDetailScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DetailScreen from '../components/DetailScreen';

const MarketDetailScreen: React.FC = () => {
  const { mercado } = useLocalSearchParams();
  const marketId = Array.isArray(mercado) ? mercado[0] : mercado;
  
  if (!marketId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Market ID not found</Text>
      </View>
    );
  }
  
  return (
    <DetailScreen 
      id={marketId} 
      type="mercado" 
    />
  );
};

export default MarketDetailScreen;
