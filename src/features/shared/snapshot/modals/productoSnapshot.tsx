// src/features/shared/snapshot/modals/productoSnapshot.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import SnapshotHeader from '../components/SnapshotHeader';
import SnapshotData from '../components/SnapshotData';
import TrendGraph from '../components/TrendGraph';
import SnapshotButtons from '../components/SnapshotButtons';
import useProductModalData from '../hooks/useProductModalData';

interface ProductoSnapshotProps {
  productId: number;
  onClose: () => void;
}

const ProductoSnapshot: React.FC<ProductoSnapshotProps> = ({ productId, onClose }) => {
  const { colors, spacing } = useTheme();
  
  // Load product data using our hook
  const { 
    productData,
    productInfo,
    loading, 
    error, 
    graphData,
    trendData
  } = useProductModalData(productId);
  
  // Log component lifecycle for debugging
  useEffect(() => {
    console.log('[ProductoSnapshot] Component mounted with productId:', productId);
    
    return () => {
      console.log('[ProductoSnapshot] Component unmounted');
    };
  }, [productId]);
  
  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary.default} />
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
          Cargando datos del producto...
        </Text>
      </View>
    );
  }
  
  // Show error state
  if (error || !productData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={[styles.errorText, ]}>
          Error al cargar los datos. Intente de nuevo.
        </Text>
        <Text style={[styles.errorDetail, { color: colors.text.secondary }]}>
          {error?.message || 'No se encontraron datos para este producto'}
        </Text>
      </View>
    );
  }
  
  // Log what we're displaying
  console.log('[ProductoSnapshot] Rendering with productData:', {
    name: productData.name,
    prices: `${productData.minPrice} - ${productData.maxPrice}`,
    unit: productData.unit,
    date: productData.date,
    graphPoints: graphData?.length || 0
  });
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header with product name */}
      <SnapshotHeader 
        title={productData.name}
        iconName={productData.iconName}
      />
      
      {/* Price data section */}
      <SnapshotData
        maxPrice={productData.maxPrice}
        minPrice={productData.minPrice}
        unit={productData.unit}
        date={productData.date}
        trend={productData.trend}
        trendPercentage={productData.trendPercentage}
      />
      
      {/* Trend Graph */}
      <View style={styles.graphContainer}>
        <Text style={[styles.graphTitle, { color: colors.text.secondary }]}>
          Tendencia de precio
        </Text>
        <TrendGraph
          data={graphData}
          showAxis={true}
          showPoints={true}
        />
      </View>
      
      {/* Action Buttons */}
      <SnapshotButtons
        onCompare={() => console.log('Compare markets clicked')}
        onAddFavorite={() => console.log('Add to favorites clicked')}
        onViewAnalysis={() => console.log('View analysis clicked')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    textAlign: 'center',
  },
  graphContainer: {
    padding: 16,
    paddingTop: 8,
  },
  graphTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  }
});

export default ProductoSnapshot;