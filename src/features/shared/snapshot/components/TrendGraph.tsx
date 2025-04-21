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
  showAxis = false, // Changed to false to match the design
  showPoints = false, // Keep points hidden to match the design
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Calculate dimensions for the graph
  const graphWidth = Dimensions.get('window').width * 0.85; 
  const graphHeight = 150; // Reduced height to match design
  
  // Define margins for the graph - smaller margins for cleaner look
  const margin = {
    top: 5,
    right: 5,
    bottom: showAxis ? 20 : 5,
    left: showAxis ? 30 : 5,
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

  if (validData.length < 2) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          Datos insuficientes para mostrar gráfico
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <BaseD3LineGraph
        data={validData}
        width={graphWidth}
        height={graphHeight}
        margin={margin}
        color="#4F46E5" // Using a stronger blue color to match the design
        showPoints={showPoints}
        showGrid={false}
        showAxis={showAxis}
        smoothCurve={true}
        formatDate={formatDate}
        formatValue={formatValue}
        yAxisTickCount={0} // No ticks for cleaner look
        xAxisTickCount={0} // No ticks for cleaner look
        // lineWidth={3} // Thicker line to match design
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyContainer: {
    height: 150,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 16,
  }
});

export default TrendGraph;