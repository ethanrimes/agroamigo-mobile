// src/features/shared/snapshot/components/SnapshotData.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import TrendTicker from '@/src/components/ui/data/TrendTicker';

interface SnapshotDataProps {
  maxPrice: number;
  minPrice: number;
  unit?: string;
  date?: string;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}

const SnapshotData: React.FC<SnapshotDataProps> = ({
  maxPrice,
  minPrice,
  unit = 'kg',
  date = '',
  trend = 'stable',
  trendPercentage = 0,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Format price display
  const formatPrice = (price: number) => {
    return `${price.toLocaleString('es-CO')}`;
  };
  
  return (
    <View style={styles.container}>
      {/* Graph Section Label */}
      <View style={styles.sectionLabelContainer}>
        <Text style={styles.sectionLabel}>Tendencia Mes</Text>
      </View>
      
      {/* Price Range Display */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceRange}>
          ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}
        </Text>
      </View>
      
      {/* Unit and Date Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.unitText}>
          / {unit}
        </Text>
        
        <Text style={styles.dateText}>
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionLabelContainer: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  priceContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  priceRange: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  unitText: {
    fontSize: 18,
    color: '#4B5563',
  },
  dateText: {
    fontSize: 18,
    color: '#6B7280',
    fontStyle: 'italic',
  }
});

export default SnapshotData;