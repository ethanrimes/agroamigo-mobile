// components/charts/BaseD3BarGraph.tsx
import React from 'react';
import { G, Rect, Text, Line } from 'react-native-svg';
import D3Container from './D3Container';
import { useD3BarGraph, useD3Histogram, BarGraphDataPoint } from '../../hooks/useD3';
import { useTheme } from '../../theme/providers/ThemeProvider';

interface BarGraphProps {
  data: BarGraphDataPoint[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  barPadding?: number;
  formatValue?: (value: number) => string;
  yAxisTickCount?: number;
  title?: string;
  style?: any;
}

const BaseD3BarGraph: React.FC<BarGraphProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 30, bottom: 60, left: 50 },
  color,
  showGrid = true,
  showAxis = true,
  barPadding = 0.2,
  formatValue = (value) => value.toString(),
  yAxisTickCount = 5,
  title,
  style,
}) => {
  const { svg } = useTheme();
  
  // Use the D3 hook to calculate the bar graph elements
  const { bars, xAxisTicks, yAxisTicks } = useD3BarGraph(
    data,
    width,
    height,
    margin,
    {
      showGrid,
      barPadding,
      color: color || svg.colors.fill.primary,
      yAxisTickCount,
      formatValue,
      minBarWidth: 10,
      maxBarWidth: 50
    }
  );
  
  // Skip rendering if no data
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <D3Container width={width} height={height} style={style}>
      {/* Title */}
      {title && (
        <Text
          x={width / 2}
          y={margin.top / 2}
          fontSize={svg.typography.fontSize.title}
          fontFamily={svg.typography.fontFamily.bold}
          fontWeight={svg.typography.fontWeight.bold}
          textAnchor="middle"
          fill={svg.colors.text.primary}
        >
          {title}
        </Text>
      )}
      
      {/* Grid lines */}
      {showGrid && (
        <G>
          {/* Horizontal grid lines (based on y-axis ticks) */}
          {yAxisTicks.map(({ value, yOffset }) => (
            <Line
              key={`grid-y-${value}`}
              x1={margin.left}
              y1={yOffset + margin.top}
              x2={width - margin.right}
              y2={yOffset + margin.top}
              stroke={svg.colors.stroke.axis}
              strokeWidth={svg.chart.axis.strokeWidth}
              opacity={svg.chart.axis.gridOpacity}
            />
          ))}
        </G>
      )}
      
      {/* Axes */}
      {showAxis && (
        <G>
          {/* X Axis */}
          <Line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* Y Axis */}
          <Line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* X Axis Ticks */}
          {xAxisTicks.map(({ value, xOffset, label }, index) => (
            <G key={`x-${value}-${index}`}>
              <Line
                x1={xOffset + margin.left}
                y1={height - margin.bottom}
                x2={xOffset + margin.left}
                y2={height - margin.bottom + svg.chart.axis.tickLength}
                stroke={svg.colors.stroke.default}
                strokeWidth={svg.chart.axis.strokeWidth}
              />
              <Text
                x={xOffset + margin.left}
                y={height - margin.bottom + svg.chart.axis.tickLength + 12}
                fontSize={svg.typography.fontSize.axisValue}
                fontFamily={svg.typography.fontFamily.regular}
                textAnchor="middle"
                fill={svg.colors.text.tertiary}
                rotation={data.length > 8 ? 45 : 0}
                originX={xOffset + margin.left}
                originY={height - margin.bottom + svg.chart.axis.tickLength + 12}
              >
                {label}
              </Text>
            </G>
          ))}
          
          {/* Y Axis Ticks */}
          {yAxisTicks.map(({ value, yOffset, label }) => (
            <G key={`y-${value}`}>
              <Line
                x1={margin.left}
                y1={yOffset + margin.top}
                x2={margin.left - svg.chart.axis.tickLength}
                y2={yOffset + margin.top}
                stroke={svg.colors.stroke.default}
                strokeWidth={svg.chart.axis.strokeWidth}
              />
              <Text
                x={margin.left - svg.chart.axis.tickLength - 5}
                y={yOffset + margin.top + 4}
                fontSize={svg.typography.fontSize.axisValue}
                fontFamily={svg.typography.fontFamily.regular}
                textAnchor="end"
                fill={svg.colors.text.tertiary}
              >
                {label}
              </Text>
            </G>
          ))}
        </G>
      )}
      
      {/* Bars */}
      {bars.map((bar, index) => (
        <Rect
          key={`bar-${index}`}
          x={bar.x + margin.left}
          y={bar.y + margin.top}
          width={bar.width}
          height={bar.height}
          fill={color || svg.colors.fill.primary}
          rx={svg.shape.borderRadius.small}
        />
      ))}
    </D3Container>
  );
};

interface HistogramProps {
  data: number[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  bins?: number;
  color?: string;
  showGrid?: boolean;
  showAxis?: boolean;
  formatValue?: (value: number) => string;
  yAxisTickCount?: number;
  title?: string;
  style?: any;
}

const BaseD3Histogram: React.FC<HistogramProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  bins = 10,
  color,
  showGrid = true,
  showAxis = true,
  formatValue = (value) => value.toString(),
  yAxisTickCount = 5,
  title,
  style,
}) => {
  const { svg } = useTheme();
  
  // Use the D3 hook to calculate the histogram elements
  const { bars, xAxisTicks, yAxisTicks } = useD3Histogram(
    data,
    width,
    height,
    margin,
    {
      bins,
      showGrid,
      color: color || svg.colors.fill.primary,
      yAxisTickCount,
      formatValue
    }
  );
  
  // Skip rendering if no data
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <D3Container width={width} height={height} style={style}>
      {/* Title */}
      {title && (
        <Text
          x={width / 2}
          y={margin.top / 2}
          fontSize={svg.typography.fontSize.title}
          fontFamily={svg.typography.fontFamily.bold}
          fontWeight={svg.typography.fontWeight.bold}
          textAnchor="middle"
          fill={svg.colors.text.primary}
        >
          {title}
        </Text>
      )}
      
      {/* Grid lines */}
      {showGrid && (
        <G>
          {/* Horizontal grid lines (based on y-axis ticks) */}
          {yAxisTicks.map(({ value, yOffset }) => (
            <Line
              key={`grid-y-${value}`}
              x1={margin.left}
              y1={yOffset + margin.top}
              x2={width - margin.right}
              y2={yOffset + margin.top}
              stroke={svg.colors.stroke.axis}
              strokeWidth={svg.chart.axis.strokeWidth}
              opacity={svg.chart.axis.gridOpacity}
            />
          ))}
        </G>
      )}
      
      {/* Axes */}
      {showAxis && (
        <G>
          {/* X Axis */}
          <Line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* Y Axis */}
          <Line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* X Axis Ticks - show fewer ticks for histogram */}
          {xAxisTicks.filter((_, i, arr) => i % Math.ceil(arr.length / 6) === 0 || i === arr.length - 1)
            .map(({ value, xOffset, label }, index) => (
              <G key={`x-${value}-${index}`}>
                <Line
                  x1={xOffset + margin.left}
                  y1={height - margin.bottom}
                  x2={xOffset + margin.left}
                  y2={height - margin.bottom + svg.chart.axis.tickLength}
                  stroke={svg.colors.stroke.default}
                  strokeWidth={svg.chart.axis.strokeWidth}
                />
                <Text
                  x={xOffset + margin.left}
                  y={height - margin.bottom + svg.chart.axis.tickLength + 12}
                  fontSize={svg.typography.fontSize.axisValue}
                  fontFamily={svg.typography.fontFamily.regular}
                  textAnchor="middle"
                  fill={svg.colors.text.tertiary}
                >
                  {label}
                </Text>
              </G>
            ))}
          
          {/* Y Axis Ticks */}
          {yAxisTicks.map(({ value, yOffset, label }) => (
            <G key={`y-${value}`}>
              <Line
                x1={margin.left}
                y1={yOffset + margin.top}
                x2={margin.left - svg.chart.axis.tickLength}
                y2={yOffset + margin.top}
                stroke={svg.colors.stroke.default}
                strokeWidth={svg.chart.axis.strokeWidth}
              />
              <Text
                x={margin.left - svg.chart.axis.tickLength - 5}
                y={yOffset + margin.top + 4}
                fontSize={svg.typography.fontSize.axisValue}
                fontFamily={svg.typography.fontFamily.regular}
                textAnchor="end"
                fill={svg.colors.text.tertiary}
              >
                {label}
              </Text>
            </G>
          ))}
        </G>
      )}
      
      {/* Histogram Bars */}
      {bars.map((bar, index) => (
        <Rect
          key={`bar-${index}`}
          x={bar.x + margin.left}
          y={bar.y + margin.top}
          width={bar.width}
          height={bar.height}
          fill={color || svg.colors.fill.primary}
          rx={svg.shape.borderRadius.small}
        />
      ))}
    </D3Container>
  );
};

export { BaseD3BarGraph, BaseD3Histogram };
export default BaseD3BarGraph;