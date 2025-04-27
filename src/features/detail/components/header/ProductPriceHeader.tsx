// src/features/detail/components/header/ProductPriceHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import DetailHeader from './DetailHeader';
import useProductPriceData from '@/src/features/detail/hooks/product/useProductPriceData';
import { Icon } from 'lucide-react-native';

interface ProductPriceHeaderProps {
  productId?: string;
}

/**
 * Product Price specific header component
 * Extends the base DetailHeader with price-specific content for products
 */
const ProductPriceHeader: React.FC<ProductPriceHeaderProps> = ({ 
  productId 
}) => {
  const { colors, typography, spacing, borders } = useTheme();
  const params = useLocalSearchParams<{ id: string }>();
  const id = productId || params.id;
  
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

  // Dynamically import icon based on the product icon name
  const IconComponent = (iconName: string) => {
    try {
      const LucideIcon = require(`lucide-react-native`)[iconName] || null;
      return LucideIcon ? <LucideIcon color={colors.neutral.black} size={48} /> : null;
    } catch (error) {
      return null;
    }
  };

  if (isLoading) {
    return (
      <DetailHeader title="Agro Amigo">
        <View style={styles.loadingContainer}>
          <Text style={[typography.textStyles.body2 as any, { color: colors.neutral.white }]}>
            Cargando...
          </Text>
        </View>
      </DetailHeader>
    );
  }

  if (error) {
    return (
      <DetailHeader title="Agro Amigo">
        <View style={styles.errorContainer}>
          <Text style={[typography.textStyles.body2 as any, { color: colors.neutral.white }]}>
            Error al cargar datos
          </Text>
        </View>
      </DetailHeader>
    );
  }

  return (
    <DetailHeader title="Agro Amigo">
      <View style={styles.contentContainer}>
        {/* Product info container */}
        <View style={styles.productInfoContainer}>
          {/* Product icon */}
          <View style={styles.iconContainer}>
            {IconComponent('Apple')}
          </View>
          
          {/* Product name and presentation */}
          <View style={styles.productTextContainer}>
            <Text style={[typography.textStyles.headline4  as any, styles.productName]}>
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
              <Text style={[typography.textStyles.body1 as any, styles.priceLabel]}>
                Min
              </Text>
              <Text style={[typography.textStyles.headline3 as any, styles.priceValue]}>
                {minPrice}
              </Text>
            </View>
            
            {/* Average price */}
            <View style={styles.priceColumn}>
              <Text style={[typography.textStyles.body1 as any, styles.priceLabel]}>
                Prom.
              </Text>
              <Text style={[typography.textStyles.headline3 as any, styles.priceValue]}>
                {avgPrice}
              </Text>
            </View>
            
            {/* Max price */}
            <View style={styles.priceColumn}>
              <Text style={[typography.textStyles.body1 as any, styles.priceLabel]}>
                Max
              </Text>
              <Text style={[typography.textStyles.headline3 as any, styles.priceValue]}>
                {maxPrice}
              </Text>
            </View>
          </View>
          
          {/* Last update date */}
          <Text style={[typography.textStyles.body3 as any, styles.lastUpdate]}>
            Ultima actualización - {date}
          </Text>
        </View>
      </View>
    </DetailHeader>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 16,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    color: 'white',
    marginBottom: 4,
  },
  presentationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  pricesContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  pricesTitle: {
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceColumn: {
    alignItems: 'center',
    flex: 1,
  },
  priceLabel: {
    color: '#000',
    marginBottom: 4,
  },
  priceValue: {
    color: '#000',
    fontWeight: 'bold',
  },
  lastUpdate: {
    color: '#000',
    textAlign: 'center',
  },
});

export default ProductPriceHeader;