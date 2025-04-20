// src/features/shared/snapshot/hooks/useTrendGraphData.ts
import { useState, useEffect, useMemo } from 'react';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import * as d3 from 'd3';
import { Dimensions } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface TrendGraphOptions {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  smoothCurve?: boolean;
  lineColor?: string;
  pointRadius?: number;
}

interface TrendGraphData {
  linePath: string;
  points: Array<{
    cx: number;
    cy: number;
    r: number;
    value: number;
    date: Date;
  }>;
  xAxisTicks: Array<{
    value: Date;
    xOffset: number;
    label: string;
  }>;
  yAxisTicks: Array<{
    value: number;
    yOffset: number;
    label: string;
  }>;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  trendPercentage: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export const useTrendGraphData = (
  data: LineGraphDataPoint[] | null,
  options: TrendGraphOptions = {}
): TrendGraphData | null => {
  const { colors } = useTheme();
  
  // Default options - capture in refs or memoize to prevent regeneration
  const graphOptions = useMemo(() => ({
    width: options.width || Dimensions.get('window').width * 0.80,
    height: options.height || 180,
    margin: options.margin || { top: 20, right: 20, bottom: 30, left: 40 },
    smoothCurve: options.smoothCurve !== undefined ? options.smoothCurve : true,
    lineColor: options.lineColor || colors.info.default,
    pointRadius: options.pointRadius || 3,
  }), [
    options.width, 
    options.height, 
    options.margin?.top, 
    options.margin?.right, 
    options.margin?.bottom, 
    options.margin?.left,
    options.smoothCurve,
    options.lineColor,
    options.pointRadius,
    colors.info.default
  ]);
  
  // Derived state for graph calculations
  const [graphData, setGraphData] = useState<TrendGraphData | null>(null);
  
  // Make sure data is stable by stringifying for comparison
  const dataKey = useMemo(() => {
    if (!data || data.length === 0) return 'empty';
    
    // Filter valid data points first
    const validData = data.filter(
      d => d.date instanceof Date && !isNaN(d.date.getTime())
    );
    
    if (validData.length === 0) return 'invalid';
    
    return JSON.stringify(validData.map(d => ({
      date: d.date.getTime(),
      value: d.value
    })));
  }, [data]);
  
  // Calculate graph data when input data changes
  useEffect(() => {
    if (!data || data.length === 0) {
      console.log('[useTrendGraphData] No data provided');
      setGraphData(null);
      return;
    }
    
    try {
      // Filter and sort data by date
      const validData = data
        .filter(d => d.date instanceof Date && !isNaN(d.date.getTime()))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      
      console.log(`[useTrendGraphData] Processing ${validData.length} valid data points`);
      
      if (validData.length < 2) {
        console.warn('[useTrendGraphData] Not enough valid data points (need at least 2)');
        setGraphData(null);
        return;
      }
      
      // Calculate min and max values for scales
      const xMin = validData[0].date;
      const xMax = validData[validData.length - 1].date;
      
      // Ensure we have a proper date range
      if (xMin.getTime() === xMax.getTime()) {
        console.warn('[useTrendGraphData] Invalid date range - same start and end date');
        // Add a day to xMax to create a range
        xMax.setDate(xMax.getDate() + 1);
      }
      
      const yValues = validData.map(d => d.value);
      const yMin = Math.min(...yValues);
      const yMax = Math.max(...yValues);
      const padding = (yMax - yMin) * 0.1 || yMin * 0.1 || 100; // Handle edge cases
      
      console.log('[useTrendGraphData] Data ranges:', {
        xRange: [xMin.toISOString(), xMax.toISOString()],
        yRange: [yMin, yMax]
      });
      
      // Calculate graph dimensions
      const innerWidth = graphOptions.width - graphOptions.margin.left - graphOptions.margin.right;
      const innerHeight = graphOptions.height - graphOptions.margin.top - graphOptions.margin.bottom;
      
      // Create scales
      const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([0, innerWidth]);
      
      const yScale = d3
        .scaleLinear()
        .domain([Math.max(0, yMin - padding), yMax + padding]) // Ensure we don't go below 0
        .range([innerHeight, 0]);
      
      // Create line generator
      const line = graphOptions.smoothCurve
        ? d3
            .line<LineGraphDataPoint>()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value))
            .curve(d3.curveCatmullRom.alpha(0.5)) // Smoother curve
        : d3
            .line<LineGraphDataPoint>()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value))
            .curve(d3.curveLinear); // Straight lines
      
      // Generate line path
      const linePath = line(validData) || '';
      
      if (!linePath) {
        console.warn('[useTrendGraphData] Failed to generate line path');
      } else {
        console.log('[useTrendGraphData] Successfully generated line path');
      }
      
      // Generate data points
      const points = validData.map(d => ({
        cx: xScale(d.date),
        cy: yScale(d.value),
        r: graphOptions.pointRadius,
        value: d.value,
        date: d.date,
      }));
      
      // Generate x-axis ticks (5 evenly spaced dates)
      const xTicks = xScale.ticks(5);
      const xAxisTicks = xTicks.map(tick => ({
        value: tick,
        xOffset: xScale(tick),
        label: formatDate(tick),
      }));
      
      // Generate y-axis ticks (5 evenly spaced values)
      const yTicks = yScale.ticks(5);
      const yAxisTicks = yTicks.map(tick => ({
        value: tick,
        yOffset: yScale(tick),
        label: formatValue(tick),
      }));
      
      // Calculate additional statistics
      const minPrice = yMin;
      const maxPrice = yMax;
      const averagePrice = 
        validData.reduce((sum, item) => sum + item.value, 0) / validData.length;
      
      // Calculate trend percentage and direction
      const firstValue = validData[0].value;
      const lastValue = validData[validData.length - 1].value;
      const change = lastValue - firstValue;
      
      const trendPercentage = Math.abs(
        firstValue !== 0 ? (change / firstValue) * 100 : 0
      );
      
      let trendDirection: 'up' | 'down' | 'stable' = 'stable';
      if (change > 0) {
        trendDirection = 'up';
      } else if (change < 0) {
        trendDirection = 'down';
      }
      
      // Set the final graph data
      setGraphData({
        linePath,
        points,
        xAxisTicks,
        yAxisTicks,
        minPrice,
        maxPrice,
        averagePrice,
        trendPercentage,
        trendDirection,
      });
      
      console.log('[useTrendGraphData] Graph data calculated successfully');
    } catch (error) {
      console.error('[useTrendGraphData] Error calculating trend graph data:', error);
      setGraphData(null);
    }
  }, [dataKey, graphOptions]); // Only depend on dataKey and memoized options
  
  return graphData;
};

// Helper functions
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-CO', {
    month: 'short',
    day: 'numeric',
  });
};

const formatValue = (value: number): string => {
  return `${value.toLocaleString('es-CO')}`;
};

export default useTrendGraphData;