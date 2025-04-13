import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Import base theme
import baseTheme, { Theme, DarkTheme } from '../base';

// Import theme adapters
import { gluestackTheme, rneTheme, d3Theme } from '../adapters';

// Import library providers
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ThemeProvider as RNEThemeProvider } from '@rneui/themed';

// Theme Context interface
interface ThemeContextType {
  theme: Theme | DarkTheme;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  themeMode: 'light' | 'dark' | 'system';
  // Library-specific themes
  gluestack: typeof gluestackTheme.light | typeof gluestackTheme.dark;
  rne: typeof rneTheme.light | typeof rneTheme.dark;
  d3: typeof d3Theme.light | typeof d3Theme.dark;
  d3Helpers: typeof d3Theme.helpers;
}

// Create a properly structured light theme with correct types
const lightTheme: Theme = {
  colors: baseTheme.colors.light,
  typography: baseTheme.typography,
  spacing: baseTheme.spacing,
  borders: baseTheme.borders,
  shadows: baseTheme.shadows,
  isDark: false
};

// Create a properly structured dark theme with correct types
const darkTheme: DarkTheme = {
  colors: baseTheme.colors.dark,
  typography: baseTheme.typography,
  spacing: baseTheme.spacing,
  borders: baseTheme.borders,
  shadows: baseTheme.shadows,
  isDark: true
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  setTheme: () => {},
  themeMode: 'light',
  gluestack: gluestackTheme.light,
  rne: rneTheme.light,
  d3: d3Theme.light,
  d3Helpers: d3Theme.helpers,
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
      
  // Get library-specific themes
  const currentGluestackTheme = isDark ? gluestackTheme.dark : gluestackTheme.light;
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
    gluestack: currentGluestackTheme,
    rne: currentRNETheme,
    d3: currentD3Theme,
    d3Helpers: d3Theme.helpers,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <GluestackUIProvider config={currentGluestackTheme}>
        <RNEThemeProvider theme={currentRNETheme}>
          {children}
        </RNEThemeProvider>
      </GluestackUIProvider>
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