// src/features/shared/snapshot/components/TrendGraph.tsx
import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text } from 'react-native';
import BaseD3LineGraph from '@/src/components/charts/BaseD3LineGraph';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import { useTrendGraphData } from '../hooks/useTrendGraphData';

interface TrendGraphProps {
  data: LineGraphDataPoint[];
  title?: string;
}

const TrendGraph: React.FC<TrendGraphProps> = ({
  data,
  title,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  // Calculate dimensions for the graph
  const graphWidth = Dimensions.get('window').width * 0.65; // 65% of modal width (which is 75% of screen)
  const graphHeight = 180;
  
  // Define margins for the graph
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
  };
  
  // Use our custom hook to process the data for the graph
  const trendData = useTrendGraphData(data, {
    width: graphWidth,
    height: graphHeight,
    margin,
    smoothCurve: true,
    lineColor: colors.info.default,
  });
  
  // Format functions
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CO', {
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatValue = (value: number) => {
    return `$${value.toLocaleString('es-CO')}`;
  };
  
  // Handle loading or no data state
  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={[styles.emptyText, ]}>
          No hay datos disponibles
        </Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <BaseD3LineGraph
        data={data}
        width={graphWidth}
        height={graphHeight}
        margin={margin}
        color={colors.info.default} // Blue color from theme
        showPoints={true}
        showGrid={true}
        showAxis={true}
        smoothCurve={true}
        formatDate={formatDate}
        formatValue={formatValue}
        yAxisTickCount={5}
        xAxisTickCount={5}
        title={title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  emptyContainer: {
    height: 180,
    width: '100%',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default TrendGraph;