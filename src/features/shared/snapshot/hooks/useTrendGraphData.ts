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
  const { svg } = useTheme();
  
  // Default options
  const {
    width = Dimensions.get('window').width * 0.65,
    height = 180,
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    smoothCurve = true,
    lineColor = svg.colors.stroke.primary,
    pointRadius = 3,
  } = options;
  
  // Derived state for graph calculations
  const [graphData, setGraphData] = useState<TrendGraphData | null>(null);
  
  // Calculate graph data when input data changes
  useEffect(() => {
    if (!data || data.length === 0) {
      setGraphData(null);
      return;
    }
    
    try {
      // Sort data by date
      const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
      
      // Calculate min and max values for scales
      const xMin = sortedData[0].date;
      const xMax = sortedData[sortedData.length - 1].date;
      const yMin = Math.min(...sortedData.map(d => d.value));
      const yMax = Math.max(...sortedData.map(d => d.value));
      const padding = (yMax - yMin) * 0.1; // Add 10% padding to y-axis
      
      // Calculate graph dimensions
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
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
      const line = smoothCurve
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
      const linePath = line(sortedData) || '';
      
      // Generate data points
      const points = sortedData.map(d => ({
        cx: xScale(d.date),
        cy: yScale(d.value),
        r: pointRadius,
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
        sortedData.reduce((sum, item) => sum + item.value, 0) / sortedData.length;
      
      // Calculate trend percentage and direction
      const firstValue = sortedData[0].value;
      const lastValue = sortedData[sortedData.length - 1].value;
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
    } catch (error) {
      console.error('Error calculating trend graph data:', error);
      setGraphData(null);
    }
  }, [
    data,
    width,
    height,
    margin,
    smoothCurve,
    lineColor,
    pointRadius,
    svg.colors.stroke.primary,
  ]);
  
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
  return `$${value.toLocaleString('es-CO')}`;
};

export default useTrendGraphData;