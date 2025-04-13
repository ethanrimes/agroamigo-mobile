// Define color palette based on the design system

// Color palette definitions
export const colors = {
    // Neutral colors
    neutral: {
      black: '#263238',
      darkGrey: '#4D4D4D',
      grey: '#717171',
      lightGrey: '#89939E',
      greyBlue: '#A8BED1',
      silver: '#F5F7FA',
      white: '#FFFFFF',
    },
    
    // Primary colors
    primary: {
      default: '#28C888',
      light: '#43A046',
      dark: '#1B5E20',
    },
    
    // Secondary colors
    secondary: {
      default: '#263238',
      light: '#4F5B62',
      dark: '#000A12',
    },
    
    // Info colors
    info: {
      default: '#2194F3',
      light: '#64B5F6',
      dark: '#0D47A1',
    },
    
    // Color shades (green palette)
    shades: {
      shade1: '#43A046',
      shade2: '#388E3B',
      shade3: '#237D31',
      shade4: '#1B5E1F',
      shade5: '#103E13',
    },
    
    // Color tints (green palette)
    tints: {
      tint1: '#66B669',
      tint2: '#81C784',
      tint3: '#A5D6A7',
      tint4: '#C8E6C9',
      tint5: '#E8F5E9',
    },
    
    // Action/semantic colors
    action: {
      warning: '#FBC02D', // Yellow
      error: '#E53835',   // Red
      success: '#2E7D31',  // Green
    },
    
    // Status colors
    status: {
      active: '#43A047',
      inactive: '#9E9E9E',
      pending: '#FFA000',
    },
    
    // Gradient colors
    gradients: {
      primary: ['#28C888', '#1B5E20'],
      secondary: ['#263238', '#000A12'],
      info: ['#2194F3', '#0D47A1'],
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F7FA',
      tertiary: '#ECEFF1',
    },
    
    // Text colors
    text: {
      primary: '#263238',
      secondary: '#4D4D4D',
      tertiary: '#717171',
      inverse: '#FFFFFF',
      disabled: '#9E9E9E',
      link: '#2194F3',
    },
    
    // Border colors
    border: {
      light: '#E0E0E0',
      default: '#BDBDBD',
      dark: '#9E9E9E',
    },
  };
  
  // Dark mode color palette
  export const darkColors = {
    // Neutral colors (inverted)
    neutral: {
      black: '#FFFFFF',
      darkGrey: '#E0E0E0',
      grey: '#BDBDBD',
      lightGrey: '#9E9E9E',
      greyBlue: '#78909C',
      silver: '#263238',
      white: '#121212',
    },
    
    // Primary colors (adjusted for dark mode)
    primary: {
      default: '#28C888',
      light: '#66BB6A', // Brighter for dark mode
      dark: '#1B5E20',
    },
    
    // Secondary colors (adjusted for dark mode)
    secondary: {
      default: '#B0BEC5',
      light: '#CFD8DC',
      dark: '#78909C',
    },
    
    // Info colors (adjusted for dark mode)
    info: {
      default: '#2194F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    
    // Color shades (green palette - adjusted for dark mode)
    shades: {
      shade1: '#43A046',
      shade2: '#388E3B',
      shade3: '#237D31',
      shade4: '#1B5E1F',
      shade5: '#103E13',
    },
    
    // Color tints (green palette - adjusted for dark mode)
    tints: {
      tint1: '#66B669',
      tint2: '#81C784',
      tint3: '#A5D6A7',
      tint4: '#C8E6C9',
      tint5: '#E8F5E9',
    },
    
    // Action/semantic colors (brighter for dark mode)
    action: {
      warning: '#FFD54F', // Brighter yellow
      error: '#EF5350',   // Brighter red
      success: '#66BB6A',  // Brighter green
    },
    
    // Status colors (adjusted for dark mode)
    status: {
      active: '#66BB6A',
      inactive: '#BDBDBD',
      pending: '#FFD54F',
    },
    
    // Gradient colors (adjusted for dark mode)
    gradients: {
      primary: ['#66BB6A', '#43A047'],
      secondary: ['#B0BEC5', '#78909C'],
      info: ['#64B5F6', '#1976D2'],
    },
    
    // Background colors (for dark mode)
    background: {
      primary: '#121212',
      secondary: '#1E1E1E',
      tertiary: '#2D2D2D',
    },
    
    // Text colors (for dark mode)
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
      tertiary: '#BDBDBD',
      inverse: '#121212',
      disabled: '#757575',
      link: '#64B5F6',
    },
    
    // Border colors (for dark mode)
    border: {
      light: '#424242',
      default: '#616161',
      dark: '#757575',
    },
  };
  
  export default { light: colors, dark: darkColors };