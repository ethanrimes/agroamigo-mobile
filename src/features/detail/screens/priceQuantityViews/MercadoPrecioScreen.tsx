// src/features/detail/screens/MercadoPrecioScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '../../components/common';
import { MarketPriceHeader } from '../../components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '../../hooks/common';

/**
 * Screen component for displaying market price details
 */
const MercadoPrecioScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(true);
  const { navigateToMarketQuantity } = useDetailNavigation();
  
  // Handle toggle between price and quantity views
  const handleToggle = (isPrice: boolean) => {
    if (!isPrice) {
      // Navigate to quantity screen if toggle is set to quantity
      if (id) {
        navigateToMarketQuantity(id);
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
      header={<MarketPriceHeader marketId={id} />}
      toggleComponent={toggleComponent}
    >
      <DataLastUpdated lastUpdated={"4/27/2025"} />
      
      <View style={styles.contentContainer}>
        <Text>Market Price content will be implemented later</Text>
      </View>
    </DetailPageWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
});

export default MercadoPrecioScreen;