// src/features/shared/snapshot/modals/productoSnapshot.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import SnapshotHeader from '../components/SnapshotHeader';
import SnapshotData from '../components/SnapshotData';
import TrendGraph from '../components/TrendGraph';
import SnapshotButtons from '../components/SnapshotButtons';
import useProductModalData from '../hooks/useProductModalData';
import SearchableDropdown from '@/src/features/shared/searchableDropdown/SearchableDropdown';
import useSnapshotLocation from '../hooks/useSnapshotLocation';

interface ProductoSnapshotProps {
  productId: number;
  onClose: () => void;
}

const ProductoSnapshot: React.FC<ProductoSnapshotProps> = ({ productId, onClose }) => {
  const { colors, spacing } = useTheme();
  
  // Use our new location hook
  const { 
    location, 
    locationDisplayString, 
    initialMarket, 
    isLoadingMarket, 
    setNewLocation 
  } = useSnapshotLocation();
  
  // Load product data using our hook, passing the location.id from our hook
  const { 
    productData,
    productInfo,
    loading, 
    error, 
    graphData,
    trendData
  } = useProductModalData(productId, location.id); // Modified to accept locationId
  
  // Log component lifecycle for debugging
  useEffect(() => {
    console.log('[ProductoSnapshot] Component mounted with productId:', productId);
    console.log('[ProductoSnapshot] Using location:', location.id);
    
    return () => {
      console.log('[ProductoSnapshot] Component unmounted');
    };
  }, [productId, location.id]);
  
  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary.default} />
        <Text style={styles.loadingText}>
          Cargando datos del producto...
        </Text>
      </View>
    );
  }
  
  // Show error state
  if (error || !productData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>
          Error al cargar los datos. Intente de nuevo.
        </Text>
        <Text style={styles.errorDetail}>
          {error?.message || 'No se encontraron datos para este producto'}
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header with product name and icon */}
        <SnapshotHeader 
          title={productData.name}
          iconName={productData.iconName}
          subtitle={locationDisplayString}
        />
        
        {/* Location dropdown - Added directly here instead of inside SnapshotHeader */}
        <View style={styles.locationContainer}>
          {!isLoadingMarket && (
            <SearchableDropdown
              placeholder="Buscar mercados..."
              onItemSelect={setNewLocation}
              dataTypeOrder="mercado-producto"
              dataTypes={['mercado']}
              initialSelectedItem={initialMarket}
              initialSelectedType="mercado"
              containerStyle={styles.locationDropdown}
            />
          )}
        </View>
        
        {/* Trend Graph */}
        <TrendGraph
          data={graphData}
          showAxis={false}
          showPoints={false}
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
        
        {/* Action Buttons */}
        <SnapshotButtons
          onCompare={() => console.log('Compare markets clicked')}
          onAddFavorite={() => console.log('Add to favorites clicked')}
          onViewAnalysis={() => console.log('View analysis clicked')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
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
    color: '#4B5563',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#EF4444',
  },
  errorDetail: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
  },
  locationContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: -5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationDropdown: {
    width: '100%',
  }
});

export default ProductoSnapshot;