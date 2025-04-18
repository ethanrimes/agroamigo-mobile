// hooks/useD3.ts
import { useMemo } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../theme/providers/ThemeProvider';

// Types for data
export interface LineGraphDataPoint {
  date: Date;
  value: number;
}

export interface BarGraphDataPoint {
  label: string;
  value: number;
}

// Shared hook for base chart calculations
export const useD3ChartBase = (
  width: number,
  height: number,
  margin = { top: 20, right: 30, bottom: 40, left: 50 }
) => {
  const { svg } = useTheme();
  
  // Calculate the chart area dimensions
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  return {
    chartWidth,
    chartHeight,
    margin,
    theme: svg
  };
};

// Hook for line graph calculations using D3
export const useD3LineGraph = (
  data: LineGraphDataPoint[],
  width: number,
  height: number,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  options = { 
    showGrid: true, 
    showPoints: true,
    smoothCurve: true,
    color: '',
    yAxisTickCount: 5,
    xAxisTickCount: 5,
    formatDate: (date: Date) => date.toLocaleDateString(),
    formatValue: (value: number) => value.toString()
  }
) => {
  const { chartWidth, chartHeight, theme } = useD3ChartBase(width, height, margin);
  const lineColor = options.color || theme.colors.fill.primary;
  
  return useMemo(() => {
    // Skip if no data or invalid dimensions
    if (!data || data.length === 0 || width <= 0 || height <= 0) {
      return {
        linePath: '',
        points: [],
        xAxisTicks: [],
        yAxisTicks: [],
        xScale: null,
        yScale: null
      };
    }

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice(options.yAxisTickCount)
      .range([chartHeight, 0]);

    // Generate the line path
    const lineGenerator = d3.line<LineGraphDataPoint>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));
    
    // Apply curve if smoothing is enabled
    if (options.smoothCurve) {
      lineGenerator.curve(d3.curveMonotoneX);
    }

    const linePath = lineGenerator(data) || '';

    // Generate axis ticks
    const xAxisTicks = xScale.ticks(options.xAxisTickCount).map(value => ({
      value,
      xOffset: xScale(value),
      label: options.formatDate(value)
    }));

    const yAxisTicks = yScale.ticks(options.yAxisTickCount).map(value => ({
      value,
      yOffset: yScale(value),
      label: options.formatValue(value)
    }));

    // Generate points for scatter overlay
    const points = options.showPoints ? data.map(d => ({
      cx: xScale(d.date),
      cy: yScale(d.value),
      r: theme.chart.line.pointRadius,
      data: d
    })) : [];

    return {
      linePath,
      points,
      xAxisTicks,
      yAxisTicks,
      xScale,
      yScale
    };
  }, [data, width, height, margin, options, chartWidth, chartHeight, theme, lineColor]);
};

// Hook for bar graph calculations using D3
export const useD3BarGraph = (
  data: BarGraphDataPoint[],
  width: number,
  height: number,
  margin = { top: 20, right: 30, bottom: 60, left: 50 },
  options = { 
    showGrid: true,
    barPadding: 0.2,
    minBarWidth: 8,
    maxBarWidth: 32,
    color: '',
    yAxisTickCount: 5,
    formatValue: (value: number) => value.toString()
  }
) => {
  const { chartWidth, chartHeight, theme } = useD3ChartBase(width, height, margin);
  const barColor = options.color || theme.colors.fill.primary;
  
  return useMemo(() => {
    // Skip if no data or invalid dimensions
    if (!data || data.length === 0 || width <= 0 || height <= 0) {
      return {
        bars: [],
        xAxisTicks: [],
        yAxisTicks: [],
        xScale: null,
        yScale: null
      };
    }

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, chartWidth])
      .padding(options.barPadding);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice(options.yAxisTickCount)
      .range([chartHeight, 0]);

    // Calculate bar width based on scale and constraints
    const calculatedBarWidth = Math.min(
      Math.max(xScale.bandwidth(), options.minBarWidth),
      options.maxBarWidth
    );

    // Generate bars
    const bars = data.map(d => {
      const x = xScale(d.label) || 0;
      // Center the bar within its band if narrower than the band
      const barX = calculatedBarWidth < xScale.bandwidth() 
        ? x + (xScale.bandwidth() - calculatedBarWidth) / 2 
        : x;
        
      return {
        x: barX,
        y: yScale(d.value),
        width: calculatedBarWidth,
        height: chartHeight - yScale(d.value),
        data: d
      };
    });

    // Generate axis ticks
    const xAxisTicks = data.map(d => ({
      value: d.label,
      xOffset: (xScale(d.label) || 0) + xScale.bandwidth() / 2,
      label: d.label
    }));

    const yAxisTicks = yScale.ticks(options.yAxisTickCount).map(value => ({
      value,
      yOffset: yScale(value),
      label: options.formatValue(value)
    }));

    return {
      bars,
      xAxisTicks,
      yAxisTicks,
      xScale,
      yScale
    };
  }, [data, width, height, margin, options, chartWidth, chartHeight, theme, barColor]);
};

// Hook for histogram calculations using D3
export const useD3Histogram = (
  data: number[],
  width: number,
  height: number,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  options = { 
    bins: 10,
    showGrid: true,
    color: '',
    yAxisTickCount: 5,
    formatValue: (value: number) => value.toString()
  }
) => {
  const { chartWidth, chartHeight, theme } = useD3ChartBase(width, height, margin);
  const barColor = options.color || theme.colors.fill.primary;
  
  return useMemo(() => {
    // Skip if no data or invalid dimensions
    if (!data || data.length === 0 || width <= 0 || height <= 0) {
      return {
        bars: [],
        xAxisTicks: [],
        yAxisTicks: [],
        xScale: null,
        yScale: null
      };
    }

    // Create histogram generator
    const histogram = d3.bin()
      .domain(d3.extent(data) as [number, number])
      .thresholds(options.bins);
    
    const bins = histogram(data);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([bins[0].x0 || 0, bins[bins.length - 1].x1 || 1])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .nice(options.yAxisTickCount)
      .range([chartHeight, 0]);

    // Generate bars
    const bars = bins.map(bin => {
      return {
        x: xScale(bin.x0 || 0),
        y: yScale(bin.length),
        width: Math.max(0, xScale(bin.x1 || 0) - xScale(bin.x0 || 0) - 1),
        height: chartHeight - yScale(bin.length),
        count: bin.length,
        x0: bin.x0,
        x1: bin.x1
      };
    });

    // Generate axis ticks
    const xAxisTicks = bins.map(bin => ({
      value: bin.x0,
      xOffset: xScale(bin.x0 || 0),
      label: options.formatValue(bin.x0 || 0)
    }));

    const yAxisTicks = yScale.ticks(options.yAxisTickCount).map(value => ({
      value,
      yOffset: yScale(value),
      label: options.formatValue(value)
    }));

    return {
      bars,
      xAxisTicks,
      yAxisTicks,
      xScale,
      yScale
    };
  }, [data, width, height, margin, options, chartWidth, chartHeight, theme, barColor]);
};

export default {
  useD3ChartBase,
  useD3LineGraph,
  useD3BarGraph,
  useD3Histogram
};