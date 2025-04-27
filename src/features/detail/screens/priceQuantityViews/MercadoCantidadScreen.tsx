// src/features/detail/screens/MercadoCantidadScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '../../components/common';
import { DetailHeader } from '../../components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '../../hooks/common';

/**
 * Screen component for displaying market quantity details
 */
const MercadoCantidadScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(false);
  const { navigateToMarketPrice } = useDetailNavigation();
  
  // Handle toggle between price and quantity views
  const handleToggle = (isPrice: boolean) => {
    if (isPrice) {
      // Navigate to price screen if toggle is set to price
      if (id) {
        navigateToMarketPrice(id);
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
      header={<DetailHeader title="Agro Amigo" />}
      toggleComponent={toggleComponent}
    >
      <DataLastUpdated lastUpdated={"4/27/2025"} />
      
      <View style={styles.contentContainer}>
        <Text>Market Quantity content will be implemented later</Text>
      </View>
    </DetailPageWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 16,
  },
});

export default MercadoCantidadScreen;