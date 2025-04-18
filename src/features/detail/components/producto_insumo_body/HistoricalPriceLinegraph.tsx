// features/detail/components/producto_insumo_body/HistoricalPriceLinegraph.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BaseD3LineGraph from '../../../../components/charts/BaseD3LineGraph';
import { useTheme } from '../../../../theme/providers/ThemeProvider';
import { useDetailProductoInsumoData } from '../../hooks/useDetailProductoInsumoData';

const { width: screenWidth } = Dimensions.get('window');

interface HistoricalPriceLinegraphProps {
  productId?: string;
  insumoId?: string;
  locationId?: string;
  period?: 'week' | 'month' | 'year' | 'all';
}

const HistoricalPriceLinegraph: React.FC<HistoricalPriceLinegraphProps> = ({
  productId,
  insumoId,
  locationId,
  period = 'month',
}) => {
  const { colors, spacing, typography } = useTheme();
  
  // Fetch historical price data using the hook
  const { historicalPrices, loading, error } = useDetailProductoInsumoData({
    productId,
    insumoId,
    locationId,
    period,
  });
  
  // Format dates for display
  const formatDate = (date: Date) => {
    if (period === 'week') {
      return date.toLocaleDateString('es-PE', { weekday: 'short' });
    } else if (period === 'month') {
      return date.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
    } else {
      return date.toLocaleDateString('es-PE', { month: 'short', year: 'numeric' });
    }
  };
  
  // Format values with currency
  const formatPrice = (value: number) => {
    return `S/ ${value.toFixed(2)}`;
  };

  // Calculate chart dimensions
  const chartWidth = screenWidth - spacing.spacing.md * 2;
  const chartHeight = 250;
  const chartMargin = { top: 20, right: 20, bottom: 40, left: 50 };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Precio Histórico
        </Text>
        <View style={styles.loadingContainer}>
          <Text style={{ color: colors.text.secondary }}>Cargando datos...</Text>
        </View>
      </View>
    );
  }
  
  if (error || !historicalPrices || historicalPrices.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Precio Histórico
        </Text>
        <View style={styles.errorContainer}>
          <Text style={{ color: colors.text.secondary }}>
            No hay datos disponibles para este período.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        Precio Histórico
      </Text>
      <BaseD3LineGraph
        data={historicalPrices}
        width={chartWidth}
        height={chartHeight}
        margin={chartMargin}
        color={colors.primary.default}
        showGrid
        showPoints
        formatDate={formatDate}
        formatValue={formatPrice}
        style={styles.chart}
      />
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
  chart: {
    alignSelf: 'center',
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

export default HistoricalPriceLinegraph;