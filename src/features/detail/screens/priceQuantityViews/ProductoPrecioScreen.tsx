// src/features/detail/screens/priceQuantityViews/ProductoPrecioScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '@/src/features/detail/components/common';
import { ProductPriceHeader } from '@/src/features/detail/components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '@/src/features/detail/hooks/common';

/**
 * Screen component for displaying product price details
 */
const ProductoPrecioScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(true);
  const { navigateToProductQuantity } = useDetailNavigation();
  
  // Handle toggle between price and quantity views
  const handleToggle = (isPrice: boolean) => {
    if (!isPrice) {
      // Navigate to quantity screen if toggle is set to quantity
      if (id) {
        navigateToProductQuantity(id);
      }
    } else {
      setIsPriceView(true);
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
      header={<ProductPriceHeader productId={id} />}
      toggleComponent={toggleComponent}
    >
      <DataLastUpdated lastUpdated={"4/27/2025"} />
      
      <View style={styles.contentContainer}>
        <Text>Product Price content will be implemented later</Text>
      </View>
    </DetailPageWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
});

export default ProductoPrecioScreen;