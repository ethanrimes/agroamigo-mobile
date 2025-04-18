import React, { createContext, useContext, ReactNode, useMemo } from 'react';

// Import theme elements
import { 
  colors, 
  typography, 
  spacing, 
  borders, 
  shadows 
} from '../base';

// Import other theme adapters (keep these)
import { rneTheme, d3Theme } from '../adapters';
import { ThemeProvider as RNEThemeProvider } from '@rneui/themed';

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

// Theme Context interface
interface ThemeContextType {
  theme: Theme;
  // Library-specific themes
  rne: typeof rneTheme;
  d3: typeof d3Theme;
  d3Helpers: typeof d3Theme.helpers;
  // Base theme elements for direct access
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borders: typeof borders;
  shadows: typeof shadows;
  // Theme-specific color categories
  primaryColor: string;
  secondaryColor: string;
  infoColor: string;
  warningColor: string;
  errorColor: string;
  successColor: string;
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

// Create a context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: baseTheme,
  rne: rneTheme,
  d3: d3Theme,
  d3Helpers: d3Theme.helpers,
  colors,
  typography,
  spacing,
  borders,
  shadows,
  primaryColor: colors.primary.default,
  secondaryColor: colors.secondary.default,
  infoColor: colors.info.default,
  warningColor: colors.action.warning,
  errorColor: colors.action.error,
  successColor: colors.action.success,
});

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children
}) => {
  // Extract specific default colors from the current theme
  const primaryColor = colors.primary.default;
  const secondaryColor = colors.secondary.default;
  const infoColor = colors.info.default;
  const warningColor = colors.action.warning;
  const errorColor = colors.action.error;
  const successColor = colors.action.success;

  // Create context value
  const contextValue: ThemeContextType = {
    theme: baseTheme,
    rne: rneTheme,
    d3: d3Theme,
    d3Helpers: d3Theme.helpers,
    // Add direct access to base theme elements
    colors,
    typography,
    spacing,
    borders,
    shadows,
    // Add theme-specific default colors
    primaryColor,
    secondaryColor,
    infoColor,
    warningColor,
    errorColor,
    successColor,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <RNEThemeProvider theme={rneTheme}>
        {children}
      </RNEThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;