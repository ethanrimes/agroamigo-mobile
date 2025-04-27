// src/features/detail/components/header/ProductPriceHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import DetailHeader from './DetailHeader';
import useProductPriceData from '@/src/features/detail/hooks/product/useProductPriceData';

interface ProductPriceHeaderProps {
  productId?: string;
}

/**
 * Simplified Product Price header component
 * Contains only the basic header without price details
 */
const ProductPriceHeader: React.FC<ProductPriceHeaderProps> = ({ 
  productId 
}) => {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ id: string }>();
  const id = productId || params.id;
  
  // Get product data for the name
  const {
    productName,
    isLoading,
    error
  } = useProductPriceData(parseInt(id || '0', 10));

  if (isLoading) {
    return (
      <DetailHeader title="Agro Amigo">
        <View style={styles.loadingContainer}>
          <Text style={[{ color: colors.neutral.white }]}>
            Cargando...
          </Text>
        </View>
      </DetailHeader>
    );
  }

  if (error) {
    return (
      <DetailHeader title="Agro Amigo">
      </DetailHeader>
    );
  }

  return (
    <DetailHeader title="Agro Amigo">
    </DetailHeader>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default ProductPriceHeader;