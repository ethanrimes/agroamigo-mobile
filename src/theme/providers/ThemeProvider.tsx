import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Import base theme
import baseTheme, { Theme, DarkTheme } from '../base';
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

// Theme Context interface
interface ThemeContextType {
  theme: Theme | DarkTheme;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
  // Library-specific themes
  rne: typeof rneTheme.light | typeof rneTheme.dark;
  d3: typeof d3Theme.light | typeof d3Theme.dark;
  d3Helpers: typeof d3Theme.helpers;
  // Base theme elements for direct access
  colors: typeof colors.light | typeof colors.dark;
  typography: typeof typography;
  spacing: typeof spacing;
  borders: typeof borders;
  shadows: typeof shadows;
}

// Create a properly structured light theme with correct types
const lightTheme: Theme = {
  colors: colors.light,
  typography: typography,
  spacing: spacing,
  borders: borders,
  shadows: shadows,
  // Add component-specific shadows explicitly
  componentShadows: shadows.componentShadows,
  // Add other shadow utilities
  elevations: shadows.elevations,
  shadowEffects: shadows.shadowEffects,
  createShadow: shadows.createShadow,
  isDark: false
};

// Create a properly structured dark theme with correct types
const darkTheme: DarkTheme = {
  colors: colors.dark,
  typography: typography,
  spacing: spacing,
  borders: borders,
  shadows: shadows,
  // Add component-specific shadows explicitly
  componentShadows: shadows.componentShadows,
  // Add other shadow utilities
  elevations: shadows.elevations,
  shadowEffects: shadows.shadowEffects,
  createShadow: shadows.createShadow,
  isDark: true
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  setTheme: () => {},
  themeMode: 'light',
  rne: rneTheme.light,
  d3: d3Theme.light,
  d3Helpers: d3Theme.helpers,
  colors: colors.light,
  typography: typography,
  spacing: spacing,
  borders: borders,
  shadows: shadows,
});

// Theme Provider Props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'system'
}) => {
  // Get device color scheme
  const deviceColorScheme = useColorScheme();
  
  // State for theme mode
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(initialTheme);
  
  // Determine if dark mode based on theme mode and device settings
  const isDark = themeMode === 'system' 
    ? deviceColorScheme === 'dark'
    : themeMode === 'dark';

  // Get the appropriate theme based on dark mode setting
  const currentTheme = isDark ? darkTheme : lightTheme;
  
  // Get current theme colors
  const currentColors = isDark ? colors.dark : colors.light;
      
  // Get library-specific themes
  const currentRNETheme = isDark ? rneTheme.dark : rneTheme.light;
  const currentD3Theme = isDark ? d3Theme.dark : d3Theme.light;

  // Function to change theme
  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setThemeMode(theme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode === 'system') {
      // This will trigger a re-render when device theme changes
    }
  }, [deviceColorScheme, themeMode]);

  // Create context value
  const contextValue: ThemeContextType = {
    theme: currentTheme,
    isDark,
    setTheme,
    themeMode,
    rne: currentRNETheme,
    d3: currentD3Theme,
    d3Helpers: d3Theme.helpers,
    // Add direct access to base theme elements
    colors: currentColors,
    typography: typography,
    spacing: spacing,
    borders: borders,
    shadows: shadows,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <RNEThemeProvider theme={currentRNETheme}>
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