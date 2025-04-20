// src/features/shared/snapshot/modals/productoSnapshot.tsx
import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useProductModalData } from '../hooks/useProductModalData';
import { Feather } from '@expo/vector-icons';
import TrendGraph from '../components/TrendGraph';
import { useLocationStore } from '@/src/store/locationStore';

interface ProductoSnapshotProps {
  productId: number;
  onClose?: () => void;
}

const ProductoSnapshot: React.FC<ProductoSnapshotProps> = ({
  productId,
  onClose,
}) => {
  const { colors, typography, spacing, borders } = useTheme();
  const { currentLocationId, locationName, municipalityName, departmentName } = useLocationStore();
  
  // Add logging for mount/unmount debugging
  useEffect(() => {
    console.log('[ProductoSnapshot] Component mounted with productId:', productId);
    return () => {
      console.log('[ProductoSnapshot] Component unmounted');
    };
  }, [productId]);
  
  // Fetch product data with useProductModalData hook
  const { productData, loading, error } = useProductModalData(productId);
  
  // Memoize graph data to prevent unnecessary re-renders
  const memoizedGraphData = useMemo(() => 
    productData?.graphData || [], 
    [productData?.id]
  );
  
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
        <Text style={[styles.errorDetailText]}>
          {error?.message || 'Datos no disponibles'}
        </Text>
      </View>
    );
  }
  
  // Format location display
  const getLocationDisplay = () => {
    if (municipalityName && departmentName) {
      return `${municipalityName}, ${departmentName} - ${locationName}`;
    }
    return locationName || 'Ubicación no especificada';
  };
  
  // Format price display
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('es-CO')}`;
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
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather 
            name={productData.iconName as any || "shopping-bag"} 
            size={32} 
            color={colors.text.primary} 
          />
          <Text style={styles.title}>{productData.name}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={onClose}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      
      {/* Location selector */}
      <TouchableOpacity 
        style={[
          styles.locationSelector, 
          { 
            backgroundColor: colors.background.secondary || '#f5f5f7',
            borderRadius: borders.borderRadii.md || 8
          }
        ]}
      >
        <Text style={styles.locationText}>{getLocationDisplay()}</Text>
        <Feather 
          name="chevron-down" 
          size={18} 
          color={colors.text.secondary} 
        />
      </TouchableOpacity>
      
      {/* Graph showing price trend - simplified height */}
      <View style={styles.graphContainer}>
        <Text style={[styles.graphTitle, { color: colors.text.tertiary || '#999' }]}>
          Tendencia Mes
        </Text>
        <TrendGraph 
          data={memoizedGraphData}
          title="" // Remove title as we have one above
          showAxis={false} // Remove axes and tick marks
        />
      </View>
      
      {/* Consolidated price display */}
      <View style={styles.priceContainer}>
        <Text style={[styles.priceValue, { color: colors.text.primary }]}>
          ${formatPrice(productData.minPrice)} - ${formatPrice(productData.maxPrice)}
        </Text>
      </View>
      
      {/* Additional info (unit, date) - stacked vertically and right-aligned */}
      <View style={styles.infoContainer}>
        <Text style={[styles.unitText, { color: colors.text.primary }]}>
          / {productData.unit}
        </Text>
        <Text style={[styles.dateText, { color: colors.text.secondary }]}>
          {productData.date}
        </Text>
      </View>
      
      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          {/* Compare button */}
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                borderColor: colors.border.light,
                borderRadius: borders.borderRadii.md || 8,
              }
            ]}
            onPress={handleCompare}
          >
            <Text style={[styles.buttonText, { 
              color: colors.text.primary,
              textDecorationLine: 'underline'
            }]}>
              Comparar mercados
            </Text>
          </TouchableOpacity>
          
          {/* Add to favorites button */}
          <TouchableOpacity 
            style={[
              styles.button, 
              { 
                borderColor: colors.border.light,
                borderRadius: borders.borderRadii.md || 8,
              }
            ]}
            onPress={handleAddFavorite}
          >
            <Text style={[styles.buttonText, { color: colors.text.primary }]}>
              Agregar a favoritos
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* View analysis button (full width) */}
        <TouchableOpacity 
          style={[
            styles.fullWidthButton, 
            { 
              borderColor: colors.border.light,
              borderRadius: borders.borderRadii.md || 8,
            }
          ]}
          onPress={handleViewAnalysis}
        >
          <Text style={[styles.buttonText, { 
            color: colors.text.primary,
            textDecorationLine: 'underline'
          }]}>
            Ver análisis
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 15,
    marginRight: 8,
  },
  graphContainer: {
    paddingHorizontal: 20,
    height: 160, 
    marginBottom: 16,
  },
  graphTitle: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: 6,
    fontWeight: '400',
    paddingLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  priceValue: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  unitText: {
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  dateText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'right',
    textDecorationLine: 'underline',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorDetailText: {
    textAlign: 'center',
    color: '#666',
  },
  buttonsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: '48%',
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ProductoSnapshot;