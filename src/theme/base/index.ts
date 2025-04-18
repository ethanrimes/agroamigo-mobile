// base/index.ts
// This file exports the centralized theme components

import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import borders from './borders';
import shadows from './shadows';

// Define Theme interface
export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borders: typeof borders;
  shadows: typeof shadows;
  componentShadows: typeof shadows.componentShadows;
  elevations: typeof shadows.elevations;
  shadowEffects: typeof shadows.shadowEffects;
  createShadow: typeof shadows.createShadow;
}

// Create the base theme
const baseTheme: Theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  componentShadows: shadows.componentShadows,
  elevations: shadows.elevations,
  shadowEffects: shadows.shadowEffects,
  createShadow: shadows.createShadow,
};

export default baseTheme;
export { colors, typography, spacing, borders, shadows };