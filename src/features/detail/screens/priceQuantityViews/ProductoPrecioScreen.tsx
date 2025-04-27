// src/features/detail/screens/priceQuantityViews/ProductoPrecioScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '@/src/features/detail/components/common';
import { DetailHeader } from '@/src/features/detail/components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '@/src/features/detail/hooks/common';
import useProductPriceData from '@/src/features/detail/hooks/product/useProductPriceData';
import { Apple } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

/**
 * Screen component for displaying product price details
 */
const ProductoPrecioScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(true);
  const { navigateToProductQuantity } = useDetailNavigation();
  const { colors, typography, spacing, borders } = useTheme();
  
  // Get product price data
  const {
    productName,
    unitsPresentationName,
    minPrice,
    avgPrice,
    maxPrice,
    date,
    isLoading,
    error
  } = useProductPriceData(parseInt(id || '0', 10));
  
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

  // Simplified header that doesn't contain price data
  const simplifiedHeader = (
    <DetailHeader title="Agro Amigo" />
  );

  return (
    <DetailPageWrapper
      header={simplifiedHeader}
      toggleComponent={toggleComponent}
    >
      {/* Removed DataLastUpdated component since we'll show date with prices */}
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando datos...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar datos</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          {/* Product info container */}
          <View style={styles.productInfoContainer}>
            {/* Product icon */}
            <View style={styles.iconContainer}>
              <Apple color={colors.neutral.black} size={36} />
            </View>
            
            {/* Product name and presentation */}
            <View style={styles.productTextContainer}>
              <Text style={[typography.textStyles.headline4 as any, styles.productName]}>
                {productName}
              </Text>
              
              <TouchableOpacity 
                style={[
                  styles.presentationButton, 
                  { 
                    backgroundColor: colors.background.tertiary,
                    borderRadius: borders.borderRadii.md
                  }
                ]}
              >
                <Text style={[typography.textStyles.body3 as any, { color: colors.text.primary }]}>
                  {unitsPresentationName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Last prices section */}
          <View style={styles.pricesContainer}>
            <Text style={[typography.textStyles.body2 as any, styles.pricesTitle]}>
              Últimos precios mayoristas
            </Text>
            
            {/* Prices display */}
            <View style={styles.pricesRow}>
              {/* Min price */}
              <View style={styles.priceColumn}>
                <Text style={[typography.textStyles.body2 as any, styles.priceLabel]}>
                  Min
                </Text>
                <Text style={[typography.textStyles.headline4 as any, styles.priceValue]}>
                  {Math.round(minPrice)}
                </Text>
              </View>
              
              {/* Average price */}
              <View style={styles.priceColumn}>
                <Text style={[typography.textStyles.body2 as any, styles.priceLabel]}>
                  Prom.
                </Text>
                <Text style={[typography.textStyles.headline4 as any, styles.priceValue]}>
                  {Math.round(avgPrice)}
                </Text>
              </View>
              
              {/* Max price */}
              <View style={styles.priceColumn}>
                <Text style={[typography.textStyles.body2 as any, styles.priceLabel]}>
                  Max
                </Text>
                <Text style={[typography.textStyles.headline4 as any, styles.priceValue]}>
                  {Math.round(maxPrice)}
                </Text>
              </View>
            </View>
            
            {/* Last update date */}
            <Text style={[typography.textStyles.body3 as any, styles.lastUpdate]}>
              Ultima actualización - {date}
            </Text>
          </View>
        </View>
      )}
    </DetailPageWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#f44336',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    color: '#000',
    marginBottom: 2,
    fontSize: 20,
  },
  presentationButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  pricesContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginTop: 12,
  },
  pricesTitle: {
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  pricesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceColumn: {
    alignItems: 'center',
    flex: 1,
  },
  priceLabel: {
    color: '#000',
    marginBottom: 2,
    fontSize: 14,
  },
  priceValue: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  lastUpdate: {
    color: '#000',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default ProductoPrecioScreen;