// src/features/detail/screens/ProductDetailScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DetailScreen from '../components/DetailScreen';

const ProductDetailScreen: React.FC = () => {
  const { producto } = useLocalSearchParams();
  const productoId = Array.isArray(producto) ? producto[0] : producto;
  
  if (!productoId) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Product ID is missing</Text>
      </View>
    );
  }
  
  return (
    <DetailScreen 
      id={productoId} 
      type="producto" 
    />
  );
};

export default ProductDetailScreen;