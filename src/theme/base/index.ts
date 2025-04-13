// Export all base theme elements from a single entry point

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import borders from './borders';
import shadows from './shadows';

// Combine all theme elements into a single theme object
const baseTheme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
};

// Type definitions for theme
export type ThemeColors = typeof colors.light;
export type DarkThemeColors = typeof colors.dark;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Borders = typeof borders;
export type Shadows = typeof shadows;

export type Theme = {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borders: Borders;
  shadows: Shadows;
  isDark: boolean;
};

export type DarkTheme = {
  colors: DarkThemeColors;
  typography: Typography;
  spacing: Spacing;
  borders: Borders;
  shadows: Shadows;
  isDark: boolean;
};

// Export individual theme elements
export { colors, typography, spacing, borders, shadows };

// Export default theme
export default baseTheme;