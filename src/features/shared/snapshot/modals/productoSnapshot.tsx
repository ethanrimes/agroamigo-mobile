// src/features/shared/snapshot/modals/productoSnapshot.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useProductModalData } from '../hooks/useProductModalData';

// Import components
import SnapshotHeader from '../components/SnapshotHeader';
import SnapshotData from '../components/SnapshotData';
import TrendGraph from '../components/TrendGraph';
import SnapshotButtons from '../components/SnapshotButtons';

interface ProductoSnapshotProps {
  productId: number;
}

const ProductoSnapshot: React.FC<ProductoSnapshotProps> = ({
  productId,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Add logging for mount/unmount debugging
  useEffect(() => {
    console.log('[ProductoSnapshot] Component mounted with productId:', productId);
    return () => {
      console.log('[ProductoSnapshot] Component unmounted');
    };
  }, [productId]);
  
  // Fetch product data with useProductModalData hook
  const { productData, loading, error, trendData } = useProductModalData(productId);
  
  // Handle loading state
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background.primary }]}>
        <ActivityIndicator size="large" color={colors.primary.default} />
        <Text style={[styles.loadingText]}>
          Cargando información...
        </Text>
      </View>
    );
  }
  
  // Handle error state
  if (error || !productData) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.errorText]}>
          Error al cargar los datos. Por favor, inténtelo de nuevo.
        </Text>
      </View>
    );
  }
  
  // Get the appropriate icon
  const getIconSource = () => {
    // In a real app, you would likely have a mapping of icon names to images
    // For now, we'll use a placeholder apple icon
    return require('@/src/assets/images/temp_logo.png');
  };
  
  // Handlers for button actions
  const handleCompare = () => {
    // Implementation to navigate to comparison screen
    console.log('Compare markets for:', productData.name);
  };
  
  const handleAddFavorite = () => {
    // Implementation to add product to favorites
    console.log('Add to favorites:', productData.name);
  };
  
  const handleViewAnalysis = () => {
    // Implementation to navigate to detailed analysis
    console.log('View analysis for:', productData.name);
  };
  
  return (
    <View style={styles.container}>
      {/* Header with product name and icon */}
      <SnapshotHeader 
        title={productData.name}
        iconSource={getIconSource()}
      />
      
      {/* Graph showing price trend */}
      <TrendGraph 
        data={productData.graphData}
        title="Precio histórico"
      />
      
      {/* Price information */}
      <SnapshotData
        maxPrice={productData.maxPrice}
        minPrice={productData.minPrice}
        unit={productData.unit}
        date={productData.date}
        trend={productData.trend}
        trendPercentage={trendData?.trendPercentage || productData.trendPercentage}
      />
      
      {/* Action buttons */}
      <SnapshotButtons
        onCompare={handleCompare}
        onAddFavorite={handleAddFavorite}
        onViewAnalysis={handleViewAnalysis}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    textAlign: 'center',
  },
});

export default ProductoSnapshot;