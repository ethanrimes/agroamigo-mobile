// src/features/detail/screens/InsumoDetailScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DetailScreen from '../components/DetailScreen';

const InsumoDetailScreen: React.FC = () => {
  const { insumo } = useLocalSearchParams();
  const insumoId = Array.isArray(insumo) ? insumo[0] : insumo;
  
  if (!insumoId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Insumo ID not found</Text>
      </View>
    );
  }
  
  return (
    <DetailScreen 
      id={insumoId} 
      type="insumo" 
    />
  );
};

export default InsumoDetailScreen;
