import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFormattedPriceData } from '../../hooks/product/useProductPriceData';
import BaseD3Histogram, { HistogramData } from '../../../../components/charts/BaseD3Histogram';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

interface PriceDistributionHistogramProps {
  artiId?: number;
  width?: number;
  height?: number;
}

const PriceDistributionHistogram: React.FC<PriceDistributionHistogramProps> = ({
  artiId,
  width = 350,
  height = 250,
}) => {
  const { colors, typography, spacing } = useTheme();
  const [minPrice, avgPrice, maxPrice, dataPoints] = useFormattedPriceData(artiId);
  
  // Create histogram bins based on price ranges
  const histogramData = useMemo(() => {
    if (!dataPoints || dataPoints.length === 0) {
      return [];
    }
    
    // Determine appropriate bin ranges based on min and max prices
    const priceDiff = maxPrice - minPrice;
    let binRanges: [number, number, string][] = [];
    
    if (priceDiff <= 0) {
      // If all prices are the same, create a single bin
      binRanges = [[minPrice, maxPrice, `${minPrice}`]];
    } else if (priceDiff < 10) {
      // For small price ranges, use smaller bins
      const binSize = priceDiff / 3;
      binRanges = [
        [minPrice, minPrice + binSize, `< ${Math.floor(minPrice + binSize)}`],
        [minPrice + binSize, minPrice + 2 * binSize, `${Math.floor(minPrice + binSize)} - ${Math.floor(minPrice + 2 * binSize)}`],
        [minPrice + 2 * binSize, maxPrice, `> ${Math.floor(minPrice + 2 * binSize)}`]
      ];
    } else {
      // For larger price ranges, create 4 bins
      const binSize = priceDiff / 4;
      binRanges = [
        [minPrice, minPrice + binSize, `< ${Math.floor(minPrice + binSize)}`],
        [minPrice + binSize, minPrice + 2 * binSize, `${Math.floor(minPrice + binSize)} - ${Math.floor(minPrice + 2 * binSize)}`],
        [minPrice + 2 * binSize, minPrice + 3 * binSize, `${Math.floor(minPrice + 2 * binSize)} - ${Math.floor(minPrice + 3 * binSize)}`],
        [minPrice + 3 * binSize, maxPrice, `> ${Math.floor(minPrice + 3 * binSize)}`]
      ];
    }
    
    // Count data points in each bin
    const histogramCounts: HistogramData[] = binRanges.map(([start, end, label]) => {
      const count = dataPoints.filter(point => point.price >= start && point.price <= end).length;
      return {
        bin: label,
        count,
      };
    });
    
    return histogramCounts;
  }, [dataPoints, minPrice, maxPrice]);
  
  // Return loading state if data is not available
  if (!dataPoints || dataPoints.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { 
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.body2,
          color: colors.text.primary,
          marginBottom: spacing.spacing.sm
        }]}>
          Distribución precio por mercado
        </Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.default} />
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { 
        fontFamily: typography.fontFamilies.heading,
        fontSize: typography.fontSizes.body2,
        color: colors.text.primary,
        marginBottom: spacing.spacing.sm
      }]}>
        Distribución precio por mercado
      </Text>
      <BaseD3Histogram
        data={histogramData}
        width={width}
        height={height}
        barColor={colors.info.default}
        labelColor={colors.text.primary}
        gridLineColor={colors.border.light}
        backgroundColor={colors.background.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PriceDistributionHistogram;