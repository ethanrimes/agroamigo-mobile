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
  
  // Format trend percentage for display
  const formatTrendPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };
  
  return (
    <View style={styles.container}>
      {/* Prices Section */}
      <View style={styles.pricesContainer}>
        <View style={styles.priceSection}>
          {/* Trend ticker and max price label */}
          <View style={styles.priceRow}>
            <TrendTicker 
              value={formatTrendPercentage(trendPercentage)} 
              trend={trend as any} // Cast to match the expected prop type
            />
            <Text style={[styles.priceLabel, ]}>
              Máximo:
            </Text>
          </View>
          {/* Max price value */}
          <Text style={[styles.priceValue, ]}>
            {formatPrice(maxPrice)}
          </Text>
        </View>
        
        <View style={styles.priceSeparator} />
        
        <View style={styles.priceSection}>
          {/* Min price label */}
          <Text style={[styles.priceLabel, ]}>
            Mínimo:
          </Text>
          {/* Min price value */}
          <Text style={[styles.priceValue,]}>
            {formatPrice(minPrice)}
          </Text>
        </View>
      </View>
      
      {/* Additional Info Section */}
      <View style={styles.infoContainer}>
        {unit && (
          <Text style={[styles.infoText, ]}>
            / bulto {unit}
          </Text>
        )}
        
        {date && (
          <Text style={[styles.dateText, ]}>
            {date}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  pricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceSection: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceLabel: {
    marginLeft: 8,
  },
  priceValue: {
    fontWeight: 'bold',
  },
  priceSeparator: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoText: {
    textDecorationLine: 'underline',
  },
  dateText: {
    textDecorationLine: 'underline',
  },
});

export default SnapshotData;