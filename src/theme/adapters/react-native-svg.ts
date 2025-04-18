// theme/adapters/react-native-svg.ts
import { colors, typography, spacing, borders } from '../base';

/**
 * Adapter for React Native SVG that transforms theme values
 * into properties compatible with React Native SVG components
 */
export const svgTheme = {
  // Color adaptations for SVG elements
  colors: {
    // Text colors for SVG Text elements
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      tertiary: colors.text.tertiary,
      inverse: colors.text.inverse,
    },
    // Fill colors for shapes
    fill: {
      primary: colors.primary.default,
      secondary: colors.secondary.default,
      info: colors.info.default,
      success: colors.action.success,
      warning: colors.action.warning,
      error: colors.action.error,
      none: 'none',
    },
    // Stroke colors for lines and path outlines
    stroke: {
      primary: colors.primary.default,
      secondary: colors.secondary.default,
      info: colors.info.default,
      success: colors.action.success,
      warning: colors.action.warning,
      error: colors.action.error,
      light: colors.border.light,
      default: colors.border.default,
      dark: colors.border.dark,
      axis: `${colors.text.tertiary}40`, // 25% opacity for axes
    },
    // Background colors for chart areas
    background: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
      tertiary: colors.background.tertiary,
    },
  },

  // Typography adaptations for SVG Text elements
  typography: {
    // Font sizes for different SVG text elements
    fontSize: {
      title: typography.fontSizes.headline4,
      axisLabel: typography.fontSizes.body4,
      axisValue: typography.fontSizes.xs,
      tooltip: typography.fontSizes.body3,
      legend: typography.fontSizes.body4,
    },
    // Font weights
    fontWeight: {
      normal: typography.fontWeights.regular.toString(),
      bold: typography.fontWeights.bold.toString(),
      medium: typography.fontWeights.medium.toString(),
    },
    // Font families
    fontFamily: {
      regular: typography.fontFamilies.body,
      bold: typography.fontFamilies.heading,
      mono: typography.fontFamilies.mono,
    },
  },

  // Spacing for SVG elements
  spacing: {
    // Margins for charts
    margin: {
      sm: {
        top: spacing.spacing.sm,
        right: spacing.spacing.sm,
        bottom: spacing.spacing.sm,
        left: spacing.spacing.sm,
      },
      md: {
        top: spacing.spacing.md,
        right: spacing.spacing.md,
        bottom: spacing.spacing.md,
        left: spacing.spacing.md,
      },
      lg: {
        top: spacing.spacing.lg,
        right: spacing.spacing.lg,
        bottom: spacing.spacing.lg,
        left: spacing.spacing.md * 1.5, // Slightly larger left margin for y-axis labels
      },
    },
    // Padding within chart elements
    padding: {
      sm: spacing.spacing.sm,
      md: spacing.spacing.md,
      lg: spacing.spacing.lg,
    },
  },

  // Line styles for SVG
  line: {
    // Stroke widths
    strokeWidth: {
      thin: 1,
      medium: 2,
      thick: 3,
    },
    // Dash patterns
    dashArray: {
      solid: "",
      dashed: "5,5",
      dotted: "1,3",
    },
  },

  // Shape attributes for SVG
  shape: {
    // Border radius for rect elements
    borderRadius: {
      none: 0,
      small: borders.borderRadii.xs,
      medium: borders.borderRadii.sm,
      large: borders.borderRadii.md,
    },
    // Point sizes for scatter plots
    pointSize: {
      small: 3,
      medium: 5,
      large: 8,
    },
  },

  // Sizing constants for charts and graphs
  chart: {
    // Bar chart dimensions
    bar: {
      minWidth: 8,
      maxWidth: 32,
      padding: 0.2, // Padding between bars (as percentage)
    },
    // Line chart dimensions
    line: {
      strokeWidth: 2,
      pointRadius: 4,
    },
    // Axis configuration
    axis: {
      strokeWidth: 1,
      tickLength: 5,
      gridOpacity: 0.2,
    },
    // Tooltip configuration
    tooltip: {
      padding: spacing.spacing.sm,
      borderRadius: borders.borderRadii.sm,
    },
  },

  // Helper functions for SVG components
  helpers: {
    // Get opacity adjusted color
    getOpacityColor: (color: string, opacity: number) => {
      // Convert hex color to rgba
      const hexToRgba = (hex: string, alpha: number) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const hexValue = hex.replace(shorthandRegex, (_m, r, g, b) => {
          return r + r + g + g + b + b;
        });
        
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
        return result 
          ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
          : hex;
      };
      
      return hexToRgba(color, opacity);
    },
  }
};

export default svgTheme;