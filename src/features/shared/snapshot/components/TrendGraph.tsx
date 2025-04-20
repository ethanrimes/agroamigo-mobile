// src/features/shared/snapshot/components/TrendGraph.tsx
import React, { memo, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import BaseD3LineGraph from '@/src/components/charts/BaseD3LineGraph';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { LineGraphDataPoint } from '@/src/hooks/useD3';

interface TrendGraphProps {
  data: LineGraphDataPoint[];
  title?: string;
  showAxis?: boolean;
  showPoints?: boolean;
}

// Using React.memo to prevent unnecessary re-renders
const TrendGraph: React.FC<TrendGraphProps> = memo(({
  data,
  title,
  showAxis = true,
  showPoints = false,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Log received data for debugging
  useEffect(() => {
    console.log('[TrendGraph] Received data points:', data?.length || 0);
    if (data && data.length > 0) {
      console.log('[TrendGraph] First and last data points:', {
        first: {
          date: data[0].date?.toISOString(),
          value: data[0].value
        },
        last: {
          date: data[data.length - 1].date?.toISOString(),
          value: data[data.length - 1].value
        }
      });
    }
  }, [data]);
  
  // Calculate dimensions for the graph
  const graphWidth = Dimensions.get('window').width * 0.85; 
  const graphHeight = 180;
  
  // Define margins for the graph
  const margin = {
    top: 20,
    right: 20,
    bottom: showAxis ? 30 : 10,
    left: showAxis ? 50 : 10,
  };
  
  // Format functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short'
    });
  };
  
  const formatValue = (value: number) => {
    return `$${Math.round(value / 1000)}k`;
  };
  
  // Handle loading or no data state
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          No hay datos disponibles
        </Text>
      </View>
    );
  }
  
  // Check for valid data points (with valid dates)
  const validData = data.filter(d => 
    d.date instanceof Date && 
    !isNaN(d.date.getTime())
  );

  // Log valid data
  console.log(`[TrendGraph] Valid data points: ${validData.length} of ${data.length}`);

  if (validData.length < 2) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          Datos insuficientes para mostrar gráfico (necesita al menos 2 puntos)
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {title && (
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>
      )}
      <BaseD3LineGraph
        data={validData}
        width={graphWidth}
        height={graphHeight}
        margin={margin}
        color={colors.info.default}
        showPoints={showPoints}
        showGrid={false}
        showAxis={showAxis}
        smoothCurve={true}
        formatDate={formatDate}
        formatValue={formatValue}
        yAxisTickCount={showAxis ? 4 : 0}
        xAxisTickCount={showAxis ? 5 : 0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  emptyContainer: {
    height: 180,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  }
});

export default TrendGraph;