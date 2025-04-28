// src/features/detail/screens/priceQuantityViews/ProductoPrecioScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  DetailPageWrapper, 
  PriceQuantityToggle,
  DataLastUpdated 
} from '@/src/features/detail/components/common';
import { DetailHeader } from '@/src/features/detail/components/header';
import { usePriceQuantityToggle, useDetailNavigation } from '@/src/features/detail/hooks/common';
import useProductPriceData, { useFormattedPriceData } from '@/src/features/detail/hooks/product/useProductPriceData';
import { Apple } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import PriceDistributionHistogram from '@/src/features/detail/components/graphs/PriceDistributionHistogram';
import RankedListTable from '@/src/features/detail/components/rankedLists/RankedListTable';
import { transformMarketsToRankedList } from '@/src/features/detail/utils/dataTransformers';

/**
 * Screen component for displaying product price details
 */
const ProductoPrecioScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isPriceView, setIsPriceView } = usePriceQuantityToggle(true);
  const { navigateToProductQuantity } = useDetailNavigation();
  const { colors, typography, spacing, borders } = useTheme();
  
  // Get screen width for histogram sizing
  const screenWidth = Dimensions.get('window').width;
  const histogramWidth = screenWidth - 50; // Account for padding
  
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
  
  // Get formatted price data for histogram
  const [minPriceFormatted, avgPriceFormatted, maxPriceFormatted, dataPoints] = 
    useFormattedPriceData(parseInt(id || '0', 10));
  
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

  // Transform data points to ranked list items
  const marketRankedItems = useMemo(() => {
    return transformMarketsToRankedList(dataPoints);
  }, [dataPoints]);

  // Create toggle component to pass to the DetailPageWrapper
  const toggleComponent = (
    <PriceQuantityToggle 
      isPriceView={isPriceView} 
      onToggle={handleToggle} 
    />
  );

  // Simplified header that doesn't contain price data
  const simplifiedHeader = (
    <DetailHeader title="AgroAmigo" />
  );
  
  // Create histogram component for the main content
  const histogramComponent = (
    <View style={styles.histogramContainer}>
      <Text style={[typography.textStyles.body2 as any, styles.histogramTitle]}>
        Distribución precio por mercado
      </Text>
      <PriceDistributionHistogram 
        artiId={parseInt(id || '0', 10)}
        width={histogramWidth}
        height={220}
      />
    </View>
  );

  // Create ranked list component for bottom content
  const rankedListComponent = useMemo(() => {
    if (marketRankedItems.length === 0) {
      return null;
    }
    
    return (
      <View style={styles.rankedListContainer}>
        <RankedListTable
          title="Mercados específicos"
          subtitle={`${marketRankedItems.length} mercados con precios recientes`}
          items={marketRankedItems}
          onOrderPress={() => {
            // This would be implemented to handle sorting logic
            console.log('Order button pressed');
          }}
        />
      </View>
    );
  }, [marketRankedItems]);

  return (
    <DetailPageWrapper
      header={simplifiedHeader}
      toggleComponent={toggleComponent}
      bottomContent={
        <View>
          {/* Histogram area */}
          {histogramComponent}
          
          {/* Ranked list */}
          {rankedListComponent}
        </View>
      }
    >
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
    padding: 16,
    minHeight: 200,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    minHeight: 200,
  },
  errorText: {
    fontSize: 14,
    color: '#f44336',
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    color: '#000',
    marginBottom: 4,
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
    padding: 12,
    marginTop: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pricesTitle: {
    color: '#000',
    marginBottom: 12,
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
    marginBottom: 4,
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
    marginTop: 4,
  },
  histogramContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  histogramTitle: {
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rankedListContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default ProductoPrecioScreen;