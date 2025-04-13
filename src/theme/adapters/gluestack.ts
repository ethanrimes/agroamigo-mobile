// Adapter for Gluestack UI with NativeWind integration
import { vars } from 'nativewind';
import { colors, typography, spacing, borders, shadows } from '../base';

// Helper function to convert hex to rgb string (format: 'r g b')
const hexToRgb = (hex: string): string => {
  // Remove the # if present
  hex = hex.replace('#', '');
  
  // Parse the hex values to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return as space-separated values for NativeWind
  return `${r} ${g} ${b}`;
};

// Convert our theme to Gluestack UI format with NativeWind vars
export const createGluestackTheme = (isDark: boolean = false) => {
  const themeColors = isDark ? colors.dark : colors.light;
  
  // Create vars configuration for NativeWind
  return vars({
    // Primary colors 
    '--color-primary-0': hexToRgb(themeColors.tints.tint5),
    '--color-primary-50': hexToRgb(themeColors.tints.tint5),
    '--color-primary-100': hexToRgb(themeColors.tints.tint4),
    '--color-primary-200': hexToRgb(themeColors.tints.tint3),
    '--color-primary-300': hexToRgb(themeColors.tints.tint2),
    '--color-primary-400': hexToRgb(themeColors.tints.tint1),
    '--color-primary-500': hexToRgb(themeColors.primary.default),
    '--color-primary-600': hexToRgb(themeColors.primary.light),
    '--color-primary-700': hexToRgb(themeColors.primary.dark),
    '--color-primary-800': hexToRgb(themeColors.shades.shade4),
    '--color-primary-900': hexToRgb(themeColors.shades.shade5),
    // '--color-primary-950': isDark ? '253 252 252' : '8 8 8',

    // Secondary colors
    '--color-secondary-0': isDark ? hexToRgb(themeColors.background.primary) : hexToRgb(themeColors.neutral.white),
    '--color-secondary-50': isDark ? hexToRgb(themeColors.background.secondary) : hexToRgb(themeColors.neutral.silver),
    '--color-secondary-100': isDark ? hexToRgb(themeColors.background.tertiary) : hexToRgb(themeColors.neutral.greyBlue),
    '--color-secondary-200': hexToRgb(themeColors.neutral.lightGrey),
    '--color-secondary-300': hexToRgb(themeColors.neutral.grey),
    '--color-secondary-400': hexToRgb(themeColors.neutral.darkGrey),
    '--color-secondary-500': hexToRgb(themeColors.secondary.default),
    '--color-secondary-600': hexToRgb(themeColors.secondary.light),
    '--color-secondary-700': hexToRgb(themeColors.secondary.dark),
    '--color-secondary-800': hexToRgb(themeColors.neutral.black),
    // '--color-secondary-900': isDark ? '150 150 150' : '10 10 10',
    // '--color-secondary-950': isDark ? '164 164 164' : '8 8 8',

    // Tertiary colors (using info colors from our theme)
    // '--color-tertiary-0': isDark ? '3 38 56' : '236 248 254',
    // '--color-tertiary-50': isDark ? '5 64 93' : '199 235 252',
    // '--color-tertiary-100': isDark ? '7 90 131' : '162 221 250',
    // '--color-tertiary-200': isDark ? '9 115 168' : '124 207 248',
    // '--color-tertiary-300': isDark ? '11 141 205' : '87 194 246',
    // '--color-tertiary-400': isDark ? '13 166 242' : '50 180 244',
    '--color-tertiary-500': hexToRgb(themeColors.info.default),
    '--color-tertiary-600': hexToRgb(themeColors.info.light),
    '--color-tertiary-700': hexToRgb(themeColors.info.dark),
    // '--color-tertiary-800': isDark ? '162 221 250' : '7 90 131',
    // '--color-tertiary-900': isDark ? '199 235 252' : '5 64 93',
    // '--color-tertiary-950': isDark ? '236 248 254' : '3 38 56',

    // Error colors
    // '--color-error-0': isDark ? '83 19 19' : '254 233 233',
    // '--color-error-50': isDark ? '127 29 29' : '254 226 226',
    // '--color-error-100': isDark ? '153 27 27' : '254 202 202',
    // '--color-error-200': isDark ? '185 28 28' : '252 165 165',
    // '--color-error-300': isDark ? '220 38 38' : '248 113 113',
    // '--color-error-400': isDark ? '230 53 53' : '239 68 68',
    '--color-error-500': hexToRgb(themeColors.action.error),
    // '--color-error-600': isDark ? '249 97 96' : '220 38 38',
    // '--color-error-700': isDark ? '229 91 90' : '185 28 28',
    // '--color-error-800': isDark ? '254 202 202' : '153 27 27',
    // '--color-error-900': isDark ? '254 226 226' : '127 29 29',
    // '--color-error-950': isDark ? '254 233 233' : '83 19 19',

    // Success colors
    // '--color-success-0': isDark ? '27 50 36' : '228 255 244',
    // '--color-success-50': isDark ? '20 83 45' : '202 255 232',
    // '--color-success-100': isDark ? '22 101 52' : '162 241 192',
    // '--color-success-200': isDark ? '32 111 62' : '132 211 162',
    // '--color-success-300': isDark ? '42 121 72' : '102 181 132',
    // '--color-success-400': isDark ? '52 131 82' : '72 151 102',
    '--color-success-500': hexToRgb(themeColors.action.success),
    // '--color-success-600': isDark ? '102 181 132' : '42 121 72',
    // '--color-success-700': isDark ? '132 211 162' : '32 111 62',
    // '--color-success-800': isDark ? '162 241 192' : '22 101 52',
    // '--color-success-900': isDark ? '202 255 232' : '20 83 45',
    // '--color-success-950': isDark ? '228 255 244' : '27 50 36',

    // Warning colors
    // '--color-warning-0': isDark ? '84 45 18' : '255 249 245',
    // '--color-warning-50': isDark ? '108 56 19' : '255 244 236',
    // '--color-warning-100': isDark ? '130 68 23' : '255 231 213',
    // '--color-warning-200': isDark ? '180 90 26' : '254 205 170',
    // '--color-warning-300': isDark ? '215 108 31' : '253 173 116',
    // '--color-warning-400': isDark ? '231 120 40' : '251 149 75',
    '--color-warning-500': hexToRgb(themeColors.action.warning),
    // '--color-warning-600': isDark ? '253 173 116' : '215 108 31',
    // '--color-warning-700': isDark ? '254 205 170' : '180 90 26',
    // '--color-warning-800': isDark ? '255 231 213' : '130 68 23',
    // '--color-warning-900': isDark ? '255 244 237' : '108 56 19',
    // '--color-warning-950': isDark ? '255 249 245' : '84 45 18',

    // Info colors
    // '--color-info-0': isDark ? '3 38 56' : '236 248 254',
    // '--color-info-50': isDark ? '5 64 93' : '199 235 252',
    // '--color-info-100': isDark ? '7 90 131' : '162 221 250',
    // '--color-info-200': isDark ? '9 115 168' : '124 207 248',
    // '--color-info-300': isDark ? '11 141 205' : '87 194 246',
    // '--color-info-400': isDark ? '13 166 242' : '50 180 244',
    '--color-info-500': hexToRgb(themeColors.info.default),
    // '--color-info-600': isDark ? '87 194 246' : '11 141 205',
    // '--color-info-700': isDark ? '124 207 248' : '9 115 168',
    // '--color-info-800': isDark ? '162 221 250' : '7 90 131',
    // '--color-info-900': isDark ? '199 235 252' : '5 64 93',
    // '--color-info-950': isDark ? '236 248 254' : '3 38 56',

    // Typography colors
    // '--color-typography-0': isDark ? '23 23 23' : '254 254 255',
    // '--color-typography-50': isDark ? '38 38 39' : '245 245 245',
    // '--color-typography-100': isDark ? '64 64 64' : '229 229 229',
    // '--color-typography-200': isDark ? '82 82 82' : '219 219 220',
    // '--color-typography-300': isDark ? '115 115 115' : '212 212 212',
    // '--color-typography-400': isDark ? '140 140 140' : '163 163 163',
    // '--color-typography-500': isDark ? '163 163 163' : '140 140 140',
    '--color-typography-600': hexToRgb(themeColors.text.tertiary),
    '--color-typography-700': hexToRgb(themeColors.text.secondary),
    '--color-typography-800': hexToRgb(themeColors.text.primary),
    // '--color-typography-900': isDark ? '245 245 245' : '38 38 39',
    // '--color-typography-950': isDark ? '254 254 255' : '23 23 23',

    // Outline colors
    // '--color-outline-0': isDark ? '26 23 23' : '253 254 254',
    // '--color-outline-50': isDark ? '39 38 36' : '243 243 243',
    // '--color-outline-100': isDark ? '65 65 65' : '230 230 230',
    // '--color-outline-200': isDark ? '83 82 82' : '221 220 219',
    // '--color-outline-300': isDark ? '115 116 116' : '211 211 211',
    // '--color-outline-400': isDark ? '140 141 141' : '165 163 163',
    '--color-outline-500': hexToRgb(themeColors.border.default),
    '--color-outline-600': hexToRgb(themeColors.border.light),
    '--color-outline-700': hexToRgb(themeColors.border.dark),
    // '--color-outline-800': isDark ? '230 230 230' : '65 65 65',
    // '--color-outline-900': isDark ? '243 243 243' : '39 38 36',
    // '--color-outline-950': isDark ? '253 254 254' : '26 23 23',

    // Background colors
    '--color-background-0': hexToRgb(themeColors.background.primary),
    '--color-background-50': hexToRgb(themeColors.background.secondary),
    '--color-background-100': hexToRgb(themeColors.background.tertiary),
    // '--color-background-200': isDark ? '83 82 82' : '220 219 219',
    // '--color-background-300': isDark ? '116 116 116' : '213 212 212',
    // '--color-background-400': isDark ? '142 142 142' : '162 163 163',
    // '--color-background-500': isDark ? '162 163 163' : '142 142 142',
    // '--color-background-600': isDark ? '213 212 212' : '116 116 116',
    // '--color-background-700': isDark ? '229 228 228' : '83 82 82',
    // '--color-background-800': isDark ? '242 241 241' : '65 64 64',
    // '--color-background-900': isDark ? '246 246 246' : '39 38 37',
    // '--color-background-950': isDark ? '255 255 255' : '18 18 18',

    // Special background colors
    // '--color-background-error': isDark ? '66 43 43' : '254 241 241',
    // '--color-background-warning': isDark ? '65 47 35' : '255 243 234',
    // '--color-background-success': isDark ? '28 43 33' : '237 252 242',
    // '--color-background-muted': isDark ? '51 51 51' : '247 248 247',
    // '--color-background-info': isDark ? '26 40 46' : '235 248 254',

    // Indicator colors for focus rings
    // '--color-indicator-primary': isDark ? '247 247 247' : '55 55 55',
    // '--color-indicator-info': isDark ? '161 199 245' : '83 153 236',
    // '--color-indicator-error': isDark ? '232 70 69' : '185 28 28',
  });
};

// Create config object with light and dark themes for Gluestack
export const config = {
  light: createGluestackTheme(false),
  dark: createGluestackTheme(true),
};

export default config;