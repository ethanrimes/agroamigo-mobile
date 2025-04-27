import React, { useEffect, useRef } from 'react';
import { G, Rect, Text, Line } from 'react-native-svg';
import * as d3 from 'd3';
import D3Container from './D3Container';
import { useTheme } from '../../theme/providers/ThemeProvider';

export type HistogramData = {
  bin: string;
  count: number;
};

interface BaseD3HistogramProps {
  data: HistogramData[];
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  gridLines?: boolean;
  showLabels?: boolean;
  barColor?: string;
  labelColor?: string;
  gridLineColor?: string;
  barPadding?: number;
  backgroundColor?: string;
}

const BaseD3Histogram: React.FC<BaseD3HistogramProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 30, bottom: 40, left: 40 },
  gridLines = true,
  showLabels = true,
  barColor,
  labelColor,
  gridLineColor,
  barPadding = 0.2,
  backgroundColor,
}) => {
  const { colors, svgHelpers, typography } = useTheme();
  
  // Set default colors based on theme
  const defaultBarColor = colors.info.default;
  const defaultLabelColor = colors.text.primary;
  const defaultGridLineColor = colors.border.light;
  
  // Use provided colors or fallback to defaults
  const finalBarColor = barColor || defaultBarColor;
  const finalLabelColor = labelColor || defaultLabelColor;
  const finalGridLineColor = gridLineColor || defaultGridLineColor;

  // Calculate dimensions
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Set up scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.bin))
    .range([0, innerWidth])
    .padding(barPadding);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) || 0])
    .nice()
    .range([innerHeight, 0]);

  // Prepare grid lines
  const yTicks = yScale.ticks(5);
  
  return (
    <D3Container width={width} height={height} backgroundColor={backgroundColor}>
      <G transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Grid lines */}
        {gridLines && yTicks.map((tick) => (
          <Line
            key={`grid-${tick}`}
            x1={0}
            y1={yScale(tick)}
            x2={innerWidth}
            y2={yScale(tick)}
            stroke={finalGridLineColor}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        
        {/* X-axis */}
        <Line
          x1={0}
          y1={innerHeight}
          x2={innerWidth}
          y2={innerHeight}
          stroke={finalLabelColor}
          strokeWidth={1}
        />
        
        {/* Bars */}
        {data.map((d, i) => (
          <G key={`bar-${i}`}>
            <Rect
              x={xScale(d.bin)}
              y={yScale(d.count)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(d.count)}
              fill={finalBarColor}
              rx={2}
            />
            
            {/* X-axis labels */}
            {showLabels && (
              <Text
                x={(xScale(d.bin) || 0) + xScale.bandwidth() / 2}
                y={innerHeight + 20}
                fill={finalLabelColor}
                textAnchor="middle"
                fontSize={typography.fontSizes.sm}
                fontWeight={typography.fontWeights.regular}
                fontFamily={typography.fontFamilies.body}
              >
                {d.bin}
              </Text>
            )}
            
            {/* Bar value labels */}
            {showLabels && d.count > 0 && (
              <Text
                x={(xScale(d.bin) || 0) + xScale.bandwidth() / 2}
                y={yScale(d.count) - 8}
                fill={finalLabelColor}
                textAnchor="middle"
                fontSize={typography.fontSizes.sm}
                fontWeight={typography.fontWeights.medium}
                fontFamily={typography.fontFamilies.body}
              >
                {d.count}
              </Text>
            )}
          </G>
        ))}
        
        {/* Y-axis */}
        <Line
          x1={0}
          y1={0}
          x2={0}
          y2={innerHeight}
          stroke={finalLabelColor}
          strokeWidth={1}
        />
        
        {/* Y-axis ticks and labels */}
        {showLabels && yTicks.map((tick) => (
          <G key={`tick-${tick}`}>
            <Line
              x1={-5}
              y1={yScale(tick)}
              x2={0}
              y2={yScale(tick)}
              stroke={finalLabelColor}
              strokeWidth={1}
            />
            <Text
              x={-10}
              y={yScale(tick)}
              dy="0.32em"
              fill={finalLabelColor}
              textAnchor="end"
              fontSize={typography.fontSizes.sm}
              fontWeight={typography.fontWeights.regular}
              fontFamily={typography.fontFamilies.body}
            >
              {tick}
            </Text>
          </G>
        ))}
      </G>
    </D3Container>
  );
};

export default BaseD3Histogram;