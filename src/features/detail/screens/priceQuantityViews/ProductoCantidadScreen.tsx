// src/features/detail/screens/ProductoCantidadScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '@/src/features/detail/components/common';
import { ProductQuantityHeader } from '@/src/features/detail/components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '@/src/features/detail/hooks/common';

/**
 * Screen component for displaying product quantity details
 */
const ProductoCantidadScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(false);
  const { navigateToProductPrice } = useDetailNavigation();
  
  // Handle toggle between price and quantity views
  const handleToggle = (isPrice: boolean) => {
    if (isPrice) {
      // Navigate to price screen if toggle is set to price
      if (id) {
        navigateToProductPrice(id);
      }
    } else {
      setIsPriceView(false);
    }
  };

  // Create toggle component to pass to the DetailPageWrapper
  const toggleComponent = (
    <PriceQuantityToggle 
      isPriceView={isPriceView} 
      onToggle={handleToggle} 
    />
  );

  return (
    <DetailPageWrapper
      header={<ProductQuantityHeader productId={id} />}
      toggleComponent={toggleComponent}
    >
      <DataLastUpdated lastUpdated={"4/27/2025"} />
      
      <View style={styles.contentContainer}>
        <Text>Product Quantity content will be implemented later</Text>
      </View>
    </DetailPageWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
});

export default ProductoCantidadScreen;