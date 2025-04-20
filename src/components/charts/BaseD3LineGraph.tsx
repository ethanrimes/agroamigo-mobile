// components/charts/BaseD3LineGraph.tsx
import React from 'react';
import { Path, G, Line, Text, Circle } from 'react-native-svg';
import D3Container from './D3Container';
import { useD3LineGraph, LineGraphDataPoint } from '../../hooks/useD3';
import { useTheme } from '../../theme/providers/ThemeProvider';

interface LineGraphProps {
  data: LineGraphDataPoint[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  showGrid?: boolean;
  showPoints?: boolean;
  showAxis?: boolean;
  smoothCurve?: boolean;
  formatDate?: (date: Date) => string;
  formatValue?: (value: number) => string;
  yAxisTickCount?: number;
  xAxisTickCount?: number;
  title?: string;
  style?: any;
}

const BaseD3LineGraph: React.FC<LineGraphProps> = ({
  data,
  width,
  height,
  margin,
  color,
  showGrid = true,
  showPoints = false, // Changed default from true to false
  showAxis = true,
  smoothCurve = true,
  formatDate = (date) => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
  formatValue = (value) => value.toString(),
  yAxisTickCount = 5,
  xAxisTickCount = 5,
  title,
  style,
}) => {
  const { svg } = useTheme();
  
  // Use the D3 hook to calculate the line graph elements
  const { linePath, points, xAxisTicks, yAxisTicks } = useD3LineGraph(
    data,
    width,
    height,
    margin,
    {
      showGrid,
      showPoints,
      smoothCurve,
      color: color || svg.colors.fill.primary,
      yAxisTickCount,
      xAxisTickCount,
      formatDate,
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
          y={margin?.top ? margin.top / 2 : 10}
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
              x1={margin?.left || 0}
              y1={yOffset + (margin?.top || 0)}
              x2={width - (margin?.right || 0)}
              y2={yOffset + (margin?.top || 0)}
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
            x1={margin?.left || 0}
            y1={height - (margin?.bottom || 0)}
            x2={width - (margin?.right || 0)}
            y2={height - (margin?.bottom || 0)}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* Y Axis */}
          <Line
            x1={margin?.left || 0}
            y1={margin?.top || 0}
            x2={margin?.left || 0}
            y2={height - (margin?.bottom || 0)}
            stroke={svg.colors.stroke.default}
            strokeWidth={svg.chart.axis.strokeWidth}
          />
          
          {/* X Axis Ticks */}
          {xAxisTicks.map(({ value, xOffset, label }) => (
            <G key={`x-${value.getTime()}`}>
              <Line
                x1={xOffset + (margin?.left || 0)}
                y1={height - (margin?.bottom || 0)}
                x2={xOffset + (margin?.left || 0)}
                y2={height - (margin?.bottom || 0) + svg.chart.axis.tickLength}
                stroke={svg.colors.stroke.default}
                strokeWidth={svg.chart.axis.strokeWidth}
              />
              <Text
                x={xOffset + (margin?.left || 0)}
                y={height - (margin?.bottom || 0) + svg.chart.axis.tickLength + 12}
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
                x1={margin?.left || 0}
                y1={yOffset + (margin?.top || 0)}
                x2={(margin?.left || 0) - svg.chart.axis.tickLength}
                y2={yOffset + (margin?.top || 0)}
                stroke={svg.colors.stroke.default}
                strokeWidth={svg.chart.axis.strokeWidth}
              />
              <Text
                x={(margin?.left || 0) - svg.chart.axis.tickLength - 5}
                y={yOffset + (margin?.top || 0) + 4}
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
      
      {/* Line Path */}
      <Path
        d={linePath}
        stroke={color || svg.colors.stroke.primary}
        strokeWidth={svg.chart.line.strokeWidth}
        fill="none"
      />
      
      {/* Data Points */}
      {showPoints && points.map((point, index) => (
        <Circle
          key={`point-${index}`}
          cx={point.cx + (margin?.left || 0)}
          cy={point.cy + (margin?.top || 0)}
          r={point.r}
          fill={svg.colors.background.primary}
          stroke={color || svg.colors.stroke.primary}
          strokeWidth={1.5}
        />
      ))}
    </D3Container>
  );
};

export default BaseD3LineGraph;