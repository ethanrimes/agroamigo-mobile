// d3.ts

// Adapter for D3.js to provide consistent theming for data visualizations
import { colors, typography, spacing } from '../base';

// Create a D3 theme adapter with color schemes and visualization settings
export const createD3Theme = () => {
  // Define color scales and palettes for different chart types
  return {
    // Base colors for the theme
    colors: {
      // Primary chart colors (for main data series)
      primary: [
        colors.primary.default,
        colors.primary.light,
        colors.primary.dark,
        colors.shades.shade3,
        colors.shades.shade4,
      ],
      
      // Secondary color scheme (for secondary data series)
      secondary: [
        colors.secondary.default,
        colors.secondary.light,
        colors.secondary.dark,
      ],
      
      // Accent colors (for highlighting specific data points)
      accent: [
        colors.info.default,
        colors.info.light,
        colors.info.dark,
      ],
      
      // Categorical colors (for nominal data categories)
      categorical: [
        colors.primary.default,
        colors.info.default,
        colors.action.success,
        colors.action.warning,
        colors.action.error,
        colors.secondary.default,
        colors.shades.shade1,
        colors.tints.tint2,
      ],
      
      // Sequential color schemes (for continuous data)
      sequential: {
        // Green sequential scale
        green: [
          colors.tints.tint5,
          colors.tints.tint4,
          colors.tints.tint3,
          colors.tints.tint2,
          colors.tints.tint1,
          colors.primary.default,
          colors.primary.light,
          colors.primary.dark,
          colors.shades.shade4,
          colors.shades.shade5,
        ],
        
        // Blue sequential scale
        blue: [
          '#E3F2FD',
          '#BBDEFB',
          '#90CAF9',
          '#64B5F6',
          '#42A5F5',
          colors.info.default,
          '#1E88E5',
          '#1976D2',
          '#1565C0',
          '#0D47A1',
        ],
      },
      
      // Diverging color schemes (for data with meaningful center point)
      diverging: {
        // Red to green (for negative to positive values)
        redToGreen: [
          '#C62828',
          '#E53835',
          '#F44336',
          '#EF5350',
          '#FFCDD2',
          '#EEEEEE',
          '#C8E6C9',
          '#81C784',
          '#4CAF50',
          '#388E3C',
          '#2E7D32',
        ],
        
        // Blue to orange
        blueToOrange: [
          '#1565C0',
          '#1976D2',
          '#42A5F5',
          '#90CAF9',
          '#BBDEFB',
          '#EEEEEE',
          '#FFE0B2',
          '#FFCC80',
          '#FFA726',
          '#F57C00',
          '#EF6C00',
        ],
      },
      
      // Special purpose colors
      heatmap: [
        '#F5F7FA',
        '#90CAF9',
        '#64B5F6',
        '#42A5F5',
        '#2196F3',
        '#1E88E5',
        '#1976D2',
        '#1565C0',
        '#0D47A1',
        '#072C6C',
      ],
      
      // Background, text and grid colors
      background: colors.background.primary,
      text: colors.text.primary,
      grid: colors.border.default,
      axis: colors.text.secondary,
    },
    
    // Chart margin configurations
    margins: {
      small: {
        top: spacing.spacing.sm,
        right: spacing.spacing.sm,
        bottom: spacing.spacing.lg,
        left: spacing.spacing.lg,
      },
      medium: {
        top: spacing.spacing.md,
        right: spacing.spacing.md,
        bottom: spacing.spacing.xl,
        left: spacing.spacing.xl,
      },
      large: {
        top: spacing.spacing.lg,
        right: spacing.spacing.lg,
        bottom: spacing.spacing.xxl,
        left: spacing.spacing.xxl,
      },
    },
    
    // Typography settings for charts
    typography: {
      fontFamily: typography.fontFamilies.body,
      title: {
        fontSize: typography.fontSizes.headline4,
        fontWeight: typography.fontWeights.semiBold,
        color: colors.text.primary,
      },
      subtitle: {
        fontSize: typography.fontSizes.body1,
        fontWeight: typography.fontWeights.medium,
        color: colors.text.secondary,
      },
      axisLabel: {
        fontSize: typography.fontSizes.body2,
        fontWeight: typography.fontWeights.medium,
        color: colors.text.secondary,
      },
      axisTickLabel: {
        fontSize: typography.fontSizes.body3,
        fontWeight: typography.fontWeights.regular,
        color: colors.text.tertiary,
      },
      legend: {
        fontSize: typography.fontSizes.body3,
        fontWeight: typography.fontWeights.regular,
        color: colors.text.secondary,
      },
      tooltip: {
        fontSize: typography.fontSizes.body3,
        fontWeight: typography.fontWeights.medium,
        color: colors.text.primary,
      },
      annotation: {
        fontSize: typography.fontSizes.body4,
        fontWeight: typography.fontWeights.medium,
        color: colors.text.secondary,
      },
    },
    
    // Layout and sizing
    layout: {
      aspectRatio: 16/9, // Default aspect ratio for charts
      maxWidth: 1200,     // Maximum width for responsive charts
      minWidth: 300,      // Minimum width for responsive charts
      barWidth: 0.7,      // Width of bars in bar charts (0-1)
      lineWidth: 2,       // Width of lines in line charts
      pointRadius: 4,     // Radius of points in scatter/line charts
      minTickSpacing: 40, // Minimum spacing between tick marks
    },
    
    // Animation settings
    animation: {
      duration: 750,   // Default transition duration in ms
      easing: 'cubic', // Default easing function
      delay: 50,       // Default delay between elements
    },
    
    // Chart-specific configurations
    chartConfig: {
      // Line chart settings
      line: {
        curveType: 'curveMonotoneX', // Default curve interpolation
        strokeWidth: 2.5,
        pointRadius: 4,
        showPoints: true,
        showArea: false,
        areaOpacity: 0.1,
      },
      
      // Bar chart settings
      bar: {
        padding: 0.2,        // Padding between bars
        cornerRadius: 2,     // Rounded corners for bars
        horizontal: false,   // Vertical by default
        stacked: false,      // Not stacked by default
      },
      
      // Pie/donut chart settings
      pie: {
        innerRadius: 0,      // 0 for pie, >0 for donut
        padAngle: 0.01,      // Small padding between segments
        cornerRadius: 2,     // Slightly rounded corners
        labelOffset: 20,     // Distance of labels from arc
      },
      
      // Scatter plot settings
      scatter: {
        pointRadius: 5,
        opacity: 0.7,
        jitter: 0,           // Add random offset (for categorical data)
      },
      
      // Axis settings
      axis: {
        tickSize: 6,         // Length of tick marks
        tickPadding: 3,      // Padding between tick and text
        domainWidth: 1,      // Width of domain line
        gridWidth: 0.5,      // Width of grid lines
        showGrid: true,      // Show grid lines
      },
      
      // Legend settings
      legend: {
        orient: 'bottom',    // Legend position
        symbolSize: 10,      // Size of legend symbols
        spacing: spacing.spacing.md,
      },
      
      // Tooltip settings
      tooltip: {
        background: colors.neutral.white,
        borderColor: colors.border.default,
        borderWidth: 1,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: spacing.spacing.sm,
      }
    },
  };
};

// Export theme
export const d3Theme = createD3Theme();

// Helper functions for D3
export const d3Helpers = {
  // Function to get categorical color scale
  getCategoricalColorScale: (domain: any[] = []) => {
    return {
      domain,
      range: d3Theme.colors.categorical,
    };
  },
  
  // Function to create a sequential color scale
  getSequentialColorScale: (type = 'green', domainMin = 0, domainMax = 100) => {
    return {
      domain: [domainMin, domainMax],
      range: d3Theme.colors.sequential[type as keyof typeof d3Theme.colors.sequential],
    };
  },
  
  // Function to create a diverging color scale
  getDivergingColorScale: (type = 'redToGreen', domainMin = -100, domainMid = 0, domainMax = 100) => {
    return {
      domain: [domainMin, domainMid, domainMax],
      range: d3Theme.colors.diverging[type as keyof typeof d3Theme.colors.diverging],
    };
  },
  
  // Function to apply theme typography to chart elements
  applyChartTypography: (selection: any, type: string) => {
    const typo = d3Theme.typography[type as keyof typeof d3Theme.typography];
    
    if (selection && typo) {
      selection
        .style('font-family', d3Theme.typography.fontFamily);
      
      // Check if typo has the expected properties before accessing them
      if (typeof typo === 'object' && 'fontSize' in typo) {
        selection.style('font-size', `${typo.fontSize}px`);
      }
      
      if (typeof typo === 'object' && 'fontWeight' in typo) {
        selection.style('font-weight', typo.fontWeight);
      }
      
      if (typeof typo === 'object' && 'color' in typo) {
        selection.style('fill', typo.color);
      }
    }
    
    return selection;
  },
  
  // Function to get chart margins
  getChartMargins: (size = 'medium') => {
    return d3Theme.margins[size as keyof typeof d3Theme.margins];
  },
};

export default {
  d3Theme,
  helpers: d3Helpers,
};