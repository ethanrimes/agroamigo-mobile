import React, { useEffect, useRef } from 'react';
import { G, Rect, Text, Line } from 'react-native-svg';
import * as d3 from 'd3';
import D3Container from './D3Container';
import { useTheme } from '../../theme/providers/ThemeProvider';

export type BarGraphDataPoint = {
  x: string;
  y: number;
};

interface BaseD3BarGraphProps {
  data: BarGraphDataPoint[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  barColor?: string;
  showValues?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  animated?: boolean;
  backgroundColor?: string;
}

const BaseD3BarGraph: React.FC<BaseD3BarGraphProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
  barColor,
  showValues = false,
  xAxisLabel = '',
  yAxisLabel = '',
  showGrid = false,
  animated = true,
  backgroundColor,
}) => {
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const animationProgressRef = useRef(0);
  
  const { colors, typography } = useTheme();
  
  // Calculate dimensions for the chart
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  // Use the provided barColor or default to theme primary color
  const barFillColor = barColor || colors.primary.default;
  
  // Create x and y scales
  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.x))
    .range([0, chartWidth])
    .padding(0.3);
  
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.y) || 0])
    .nice()
    .range([chartHeight, 0]);
  
  // Generate y-axis ticks
  const yTicks = yScale.ticks(5);
  
  // Animation effect
  useEffect(() => {
    if (animated) {
      animationProgressRef.current = 0;
      
      const animate = () => {
        animationProgressRef.current += 0.1;
        
        if (animationProgressRef.current >= 1) {
          animationProgressRef.current = 1;
          if (animationRef.current) {
            clearTimeout(animationRef.current);
            animationRef.current = null;
          }
        } else {
          animationRef.current = setTimeout(animate, 30);
        }
      };
      
      animate();
      
      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
          animationRef.current = null;
        }
      };
    } else {
      animationProgressRef.current = 1;
    }
  }, [data, animated]);
  
  return (
    <D3Container width={width} height={height} backgroundColor={backgroundColor}>
      <G transform={`translate(${margin.left}, ${margin.top})`}>
        {/* X-axis line */}
        <Line
          x1={0}
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          stroke={colors.border.default}
          strokeWidth={1}
        />
        
        {/* Y-axis line */}
        <Line
          x1={0}
          y1={0}
          x2={0}
          y2={chartHeight}
          stroke={colors.border.default}
          strokeWidth={1}
        />
        
        {/* Grid lines */}
        {showGrid &&
          yTicks.map((tick, i) => (
            <Line
              key={`grid-${i}`}
              x1={0}
              y1={yScale(tick)}
              x2={chartWidth}
              y2={yScale(tick)}
              stroke={colors.border.light}
              strokeWidth={0.5}
              strokeDasharray="4,4"
            />
          ))}
        
        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = chartHeight - yScale(d.y * animationProgressRef.current);
          return (
            <G key={`bar-${i}`}>
              <Rect
                x={xScale(d.x)}
                y={chartHeight - barHeight}
                width={xScale.bandwidth()}
                height={barHeight}
                fill={barFillColor}
                rx={2}
                ry={2}
              />
              
              {/* Bar values */}
              {showValues && (
                <Text
                  x={(xScale(d.x) || 0) + xScale.bandwidth() / 2}
                  y={chartHeight - barHeight - 5}
                  textAnchor="middle"
                  fill={colors.text.primary}
                  fontFamily={typography.fontFamilies.body}
                  fontSize={typography.fontSizes.xs}
                >
                  {d.y}
                </Text>
              )}
              
              {/* X-axis labels */}
              <Text
                x={(xScale(d.x) || 0) + xScale.bandwidth() / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                fill={colors.text.tertiary}
                fontFamily={typography.fontFamilies.body}
                fontSize={typography.fontSizes.xs}
              >
                {d.x}
              </Text>
            </G>
          );
        })}
        
        {/* Y-axis ticks and labels */}
        {yTicks.map((tick, i) => (
          <G key={`tick-${i}`}>
            <Line
              x1={-5}
              y1={yScale(tick)}
              x2={0}
              y2={yScale(tick)}
              stroke={colors.border.default}
              strokeWidth={1}
            />
            <Text
              x={-10}
              y={yScale(tick)}
              textAnchor="end"
              // dominantBaseline="middle"
              fill={colors.text.tertiary}
              fontFamily={typography.fontFamilies.body}
              fontSize={typography.fontSizes.xs}
            >
              {tick}
            </Text>
          </G>
        ))}
        
        {/* X-axis label */}
        {xAxisLabel && (
          <Text
            x={chartWidth / 2}
            y={chartHeight + 35}
            textAnchor="middle"
            fill={colors.text.secondary}
            fontFamily={typography.fontFamilies.body}
            fontSize={typography.fontSizes.sm}
          >
            {xAxisLabel}
          </Text>
        )}
        
        {/* Y-axis label */}
        {yAxisLabel && (
          <Text
            x={-chartHeight / 2}
            y={-30}
            textAnchor="middle"
            transform={`rotate(-90, ${-chartHeight / 2}, ${-30})`}
            fill={colors.text.secondary}
            fontFamily={typography.fontFamilies.body}
            fontSize={typography.fontSizes.sm}
          >
            {yAxisLabel}
          </Text>
        )}
      </G>
    </D3Container>
  );
};

export default BaseD3BarGraph;