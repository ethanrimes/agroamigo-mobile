// features/detail/components/producto_insumo_body/PriceDistributionHistogram.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BaseD3Histogram } from '../../../../components/charts/BaseD3BarGraph';
import { useTheme } from '../../../../theme/providers/ThemeProvider';
import { useDetailProductoInsumoData } from '../../hooks/useDetailProductoInsumoData';

const { width: screenWidth } = Dimensions.get('window');

interface PriceDistributionHistogramProps {
  productId?: string;
  insumoId?: string;
  period?: 'current' | 'week' | 'month';
}

const PriceDistributionHistogram: React.FC<PriceDistributionHistogramProps> = ({
  productId,
  insumoId,
  period = 'current',
}) => {
  const { colors, spacing, typography } = useTheme();
  
  // Fetch price distribution data using the hook
  const { priceDistribution, loading, error } = useDetailProductoInsumoData({
    productId,
    insumoId,
    distributionPeriod: period,
  });
  
  // Format price values with currency
  const formatPrice = (value: number) => {
    return `S/ ${value.toFixed(2)}`;
  };

  // Calculate chart dimensions
  const chartWidth = screenWidth - spacing.spacing.md * 2;
  const chartHeight = 250;
  const chartMargin = { top: 20, right: 20, bottom: 40, left: 50 };
  
  // Determine number of bins based on data range
  const calculateBins = (data: number[]) => {
    if (!data || data.length <= 1) return 5;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    // For small datasets or small ranges, use fewer bins
    if (data.length < 20 || range < 5) return 5;
    if (data.length < 50 || range < 10) return 8;
    return 10;
  };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Distribución de Precios
        </Text>
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.text.secondary }}>Cargando datos...</Text>
        </View>
      </View>
    );
  }
  
  if (error || !priceDistribution || priceDistribution.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Distribución de Precios
        </Text>
        <View style={styles.errorContainer}>
          <Text style={{ color: colors.text.secondary }}>
            No hay datos disponibles para este período.
          </Text>
        </View>
      </View>
    );
  }
  
  // Calculate statistics for display
  const avgPrice = priceDistribution.reduce((sum, price) => sum + price, 0) / priceDistribution.length;
  const minPrice = Math.min(...priceDistribution);
  const maxPrice = Math.max(...priceDistribution);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Distribución de Precios
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Precio Promedio</Text>
          <Text style={[styles.statValue, { color: colors.primary.default }]}>
            {formatPrice(avgPrice)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Mínimo</Text>
          <Text style={styles.statValue}>{formatPrice(minPrice)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Máximo</Text>
          <Text style={styles.statValue}>{formatPrice(maxPrice)}</Text>
        </View>
      </View>
      
      <BaseD3Histogram
        data={priceDistribution}
        width={chartWidth}
        height={chartHeight}
        margin={chartMargin}
        color={colors.secondary.default}
        bins={calculateBins(priceDistribution)}
        showGrid
        formatValue={formatPrice}
        style={styles.chart}
      />
      
      <Text style={styles.caption}>
        Precios en todos los mercados disponibles
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#717171',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  chart: {
    alignSelf: 'center',
  },
  caption: {
    fontSize: 12,
    color: '#717171',
    textAlign: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PriceDistributionHistogram;