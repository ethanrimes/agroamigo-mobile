// src/features/shared/snapshot/components/TrendGraph.tsx
import React, { memo } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import BaseD3LineGraph from '@/src/components/charts/BaseD3LineGraph';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import { useTrendGraphData } from '../hooks/useTrendGraphData';

interface TrendGraphProps {
  data: LineGraphDataPoint[];
  title?: string;
  showAxis?: boolean;
  showPoints?: boolean; // Added prop to control points display
}

// Using React.memo to prevent unnecessary re-renders
const TrendGraph: React.FC<TrendGraphProps> = memo(({
    data,
    title,
    showAxis = true,
    showPoints = false, // Default to false to show just the line
  }) => {
    const { colors, typography, spacing } = useTheme();
    
    // Calculate dimensions for the graph - smaller than original
    const graphWidth = Dimensions.get('window').width * 0.65; 
    const graphHeight = 120; // Reduced height
    
    // Define margins for the graph - reduced to make chart larger
    const margin = {
      top: 10,
      right: 10,
      bottom: showAxis ? 20 : 5,
      left: showAxis ? 30 : 5,
    };
    
    // Format functions - simplified
    const formatDate = (date: Date) => {
      // Only showing the day of month
      return date.getDate().toString();
    };
    
    const formatValue = (value: number) => {
      // Simplified display
      return `$${Math.round(value / 1000)}k`;
    };
    
    // Handle loading or no data state
    if (!data || data.length === 0) {
      return (
        <View style={[styles.container, styles.emptyContainer]}>
          <Text style={[styles.emptyText]}>
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
          showPoints={showPoints} // Using the prop value instead of hardcoded true
          showGrid={false} // Hide grid to simplify
          showAxis={showAxis} // Can be disabled from props
          smoothCurve={true}
          formatDate={formatDate}
          formatValue={formatValue}
          yAxisTickCount={showAxis ? 3 : 0} // No ticks when axis is hidden
          xAxisTickCount={showAxis ? 3 : 0} // No ticks when axis is hidden
          title={title}
        />
      </View>
    );
  });
  
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8, // Reduced margin
    },
    emptyContainer: {
      height: 120, // Match graph height
      width: '100%',
      backgroundColor: '#F5F7FA',
      borderRadius: 8,
    },
    emptyText: {
      textAlign: 'center',
    },
});

export default TrendGraph;