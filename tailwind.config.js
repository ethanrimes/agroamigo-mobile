import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Changed from "media" to "class" for single theme support
  content: [
    "src/**/*.{tsx,jsx,ts,js}",
    "app/**/*.{tsx,jsx,ts,js}",
    "components/**/*.{tsx,jsx,ts,js}"
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      // Color definitions from colors.ts
      colors: {
        // Primary colors
        primary: {
          default: '#28C888',
          light: '#43A046',
          dark: '#1B5E20',
        },
        secondary: {
          default: '#263238',
          light: '#4F5B62',
          dark: '#000A12',
        },
        tertiary: {
          // Keep this object for pattern matching
        },
        error: {
          default: '#E53835',
        },
        success: {
          default: '#2E7D31',
        },
        warning: {
          default: '#FBC02D',
        },
        info: {
          default: '#2194F3',
          light: '#64B5F6',
          dark: '#0D47A1',
        },
        typography: {
          white: '#FFFFFF',
          gray: '#D4D4D4',
          black: '#181718',
        },
        outline: {
          // Keep this object for pattern matching
        },
        background: {
          error: 'rgba(229, 56, 53, 0.1)',
          warning: 'rgba(251, 192, 45, 0.1)',
          muted: 'rgba(158, 158, 158, 0.1)',
          success: 'rgba(46, 125, 49, 0.1)',
          info: 'rgba(33, 148, 243, 0.1)',
          light: '#FBFBFB',
          dark: '#181719',
          primary: '#FFFFFF',
          secondary: '#F5F7FA',
          tertiary: '#ECEFF1',
        },
        indicator: {
          primary: 'rgba(40, 200, 136, 0.8)',
          info: 'rgba(33, 148, 243, 0.8)',
          error: 'rgba(229, 56, 53, 0.8)',
        },
        // Additional color definitions from colors.ts
        neutral: {
          black: '#263238',
          darkGrey: '#4D4D4D',
          grey: '#717171',
          lightGrey: '#89939E',
          greyBlue: '#A8BED1',
          silver: '#F5F7FA',
          white: '#FFFFFF',
        },
        emeraldentrance: {
          tan: '#b68d40',      // RGB: 182, 141, 64
          crema: '#f4ebd0',    // RGB: 244, 235, 208
          charcoal: '#122620', // RGB: 18, 38, 32
          gold: '#d6ad60',     // RGB: 214, 173, 96
          brown: '#8c6d31',    // RGB: 140, 109, 49
        },
        green: {
          // Based on color shades and tints from colors.ts
          shade1: '#43A046',
          shade2: '#388E3B',
          shade3: '#237D31',
          shade4: '#1B5E1F',
          shade5: '#103E13',
          shade6: '#0A2A0C',
          tint1: '#66B669',
          tint2: '#81C784',
          tint3: '#A5D6A7',
          tint4: '#C8E6C9',
          tint5: '#E8F5E9',
        },
        status: {
          active: '#43A047',
          inactive: '#9E9E9E',
          pending: '#FFA000',
        },
        text: {
          primary: '#263238',
          secondary: '#4D4D4D',
          tertiary: '#717171',
          inverse: '#FFFFFF',
          disabled: '#9E9E9E',
          link: '#2194F3',
        },
        border: {
          light: '#E0E0E0',
          default: '#BDBDBD',
          dark: '#9E9E9E',
        },
      },
      
      // Typography definitions from typography.ts
      fontFamily: {
        heading: ['Inter-SemiBold', 'sans-serif'],
        body: ['Inter-Regular', 'sans-serif'],
        mono: ['RobotoMono-Regular', 'monospace'],
        roboto: ['Roboto', 'sans-serif'],
      },
      
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extrablack: '950',
      },
      
      fontSize: {
        // Existing
        '2xs': '10px',
        // From typography.ts
        xs: '10px',
        sm: '12px',
        md: '14px',
        lg: '16px',
        xl: '18px',
        xxl: '20px',
        xxxl: '24px',
        display: '36px',
        jumbo: '48px',
        massive: '64px',
        // Headline sizes
        'headline-1': '64px',
        'headline-2': '36px',
        'headline-3': '28px',
        'headline-4': '20px',
        // Body sizes
        'body-1': '18px',
        'body-2': '16px',
        'body-3': '14px',
        'body-4': '12px',
      },
      
      lineHeight: {
        // From typography.ts
        'headline-1': '76px',
        'headline-2': '44px',
        'headline-3': '36px',
        'headline-4': '28px',
        'body-1': '28px',
        'body-2': '24px',
        'body-3': '20px',
        'body-4': '16px',
        tight: '1.1',
        normal: '1.25',
        relaxed: '1.5',
        loose: '1.75',
      },
      
      letterSpacing: {
        // From typography.ts
        tighter: '-0.8px',
        tight: '-0.4px',
        normal: '0px',
        wide: '0.4px',
        wider: '0.8px',
        widest: '1.6px',
      },
      
      // Spacing definitions from spacing.ts
      spacing: {
        // Base unit is 4px
        '0': '0px',
        '1': '2px',   // 0.5 * base
        '2': '4px',   // 1 * base
        '3': '6px',   // 1.5 * base
        '4': '8px',   // 2 * base
        '5': '12px',  // 3 * base
        '6': '16px',  // 4 * base
        '7': '20px',  // 5 * base
        '8': '24px',  // 6 * base
        '9': '28px',  // 7 * base
        '10': '32px', // 8 * base
        '12': '48px', // 12 * base
        '16': '64px', // 16 * base
        '20': '80px', // 20 * base
        '24': '96px', // 24 * base
        '32': '128px', // 32 * base
        // Named spacings
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px',
      },
      
      // Border definitions from borders.ts
      borderWidth: {
        none: '0',
        hairline: '0.5px',
        thin: '1px',
        medium: '2px',
        thick: '3px',
        heavy: '4px',
      },
      
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        round: '1000px',
        full: '9999px',
        circle: '50%', // Added from borders.ts
        // Component specific from borders.ts
        button: '8px',   // md
        card: '12px',    // lg
        input: '4px',    // sm
        modal: '12px',   // lg
        pill: '1000px',  // round
        tag: '4px',      // sm
        tooltip: '4px',  // sm
        avatar: '50%',   // Added from borders.ts
      },
      
      // Shadow definitions from shadows.ts
      boxShadow: {
        // Existing shadows
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
        // From shadows.ts
        none: 'none',
        xs: '0px 1px 1.5px rgba(0, 0, 0, 0.15)',
        sm: '0px 2px 2.5px rgba(0, 0, 0, 0.2)',
        md: '0px 3px 3.5px rgba(0, 0, 0, 0.22)',
        lg: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        xl: '0px 8px 12px rgba(0, 0, 0, 0.3)',
        xxl: '0px 12px 16px rgba(0, 0, 0, 0.35)',
        // Component specific shadows
        card: '0px 2px 2.5px rgba(0, 0, 0, 0.2)',
        button: '0px 1px 1.5px rgba(0, 0, 0, 0.15)',
        'action-button': '0px 3px 3.5px rgba(0, 0, 0, 0.22)',
        modal: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        popover: '0px 8px 12px rgba(0, 0, 0, 0.3)',
        tooltip: '0px 3px 3.5px rgba(0, 0, 0, 0.18)',
        header: '0px 2px 2.5px rgba(0, 0, 0, 0.12)',
        'bottom-tab': '0px -2px 2.5px rgba(0, 0, 0, 0.08)',
        // Special effects
        'inner': 'inset 0px 0px 5px rgba(0, 0, 0, 0.1)',
        'ambient': '0px 4px 16px rgba(0, 0, 0, 0.12)',
        'directional': '4px 4px 8px rgba(0, 0, 0, 0.25)',
        'sharp': '0px 6px 3px rgba(0, 0, 0, 0.3)',
      },
      
      // Text transform utilities from typography.ts
      textTransform: {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
        normal: 'none',
      },

      // Text alignment from typography.ts
      textAlign: {
        left: 'left',
        center: 'center',
        right: 'right',
        justify: 'justify',
      },
    },
  },
  plugins: [
    gluestackPlugin,
    function({ addComponents, theme }) {
      // Add text styles as components
      const textStyles = {
        // Headline styles
        '.text-headline-1': {
          fontFamily: theme('fontFamily.heading'),
          fontSize: theme('fontSize.headline-1'),
          lineHeight: theme('lineHeight.headline-1'),
          fontWeight: theme('fontWeight.semiBold'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-headline-2': {
          fontFamily: theme('fontFamily.heading'),
          fontSize: theme('fontSize.headline-2'),
          lineHeight: theme('lineHeight.headline-2'),
          fontWeight: theme('fontWeight.semiBold'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-headline-3': {
          fontFamily: theme('fontFamily.heading'),
          fontSize: theme('fontSize.headline-3'),
          lineHeight: theme('lineHeight.headline-3'),
          fontWeight: theme('fontWeight.semiBold'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-headline-4': {
          fontFamily: theme('fontFamily.heading'),
          fontSize: theme('fontSize.headline-4'),
          lineHeight: theme('lineHeight.headline-4'),
          fontWeight: theme('fontWeight.semiBold'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        
        // Body styles
        '.text-body-1': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-1'),
          lineHeight: theme('lineHeight.body-1'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-1-medium': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-1'),
          lineHeight: theme('lineHeight.body-1'),
          fontWeight: theme('fontWeight.medium'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-2': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-2'),
          lineHeight: theme('lineHeight.body-2'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-2-medium': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-2'),
          lineHeight: theme('lineHeight.body-2'),
          fontWeight: theme('fontWeight.medium'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-3': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-3'),
          lineHeight: theme('lineHeight.body-3'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-3-medium': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-3'),
          lineHeight: theme('lineHeight.body-3'),
          fontWeight: theme('fontWeight.medium'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-body-4': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.body-4'),
          lineHeight: theme('lineHeight.body-4'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        
        // Special text styles
        '.text-caption': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.xs'),
          lineHeight: theme('lineHeight.tight'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-button': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.md'),
          lineHeight: theme('lineHeight.normal'),
          fontWeight: theme('fontWeight.semiBold'),
          letterSpacing: theme('letterSpacing.wide'),
          textTransform: theme('textTransform.uppercase'),
        },
        '.text-link': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.md'),
          lineHeight: theme('lineHeight.normal'),
          fontWeight: theme('fontWeight.medium'),
          letterSpacing: theme('letterSpacing.normal'),
        },
        '.text-code': {
          fontFamily: theme('fontFamily.mono'),
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.relaxed'),
          fontWeight: theme('fontWeight.regular'),
          letterSpacing: theme('letterSpacing.normal'),
        },
      };
      
      // Adding component-specific spacing
      const componentSpacing = {
        '.card-padding': {
          padding: theme('spacing.md'),
        },
        '.card-margin-bottom': {
          marginBottom: theme('spacing.md'),
        },
        '.form-group-margin-bottom': {
          marginBottom: theme('spacing.md'),
        },
        '.input-padding': {
          paddingVertical: theme('spacing.sm'),
          paddingHorizontal: theme('spacing.md'),
        },
        '.list-item-padding': {
          padding: theme('spacing.md'),
        },
        '.list-item-spacing': {
          gap: theme('spacing.sm'),
        },
        '.button-padding': {
          paddingVertical: theme('spacing.sm'),
          paddingHorizontal: theme('spacing.md'),
        },
        '.icon-margin': {
          margin: theme('spacing.xs'),
        },
      };
      
      // Adding insets from spacing.ts
      const insets = {
        '.inset-xs': {
          padding: theme('spacing.xs'),
        },
        '.inset-sm': {
          padding: theme('spacing.sm'),
        },
        '.inset-md': {
          padding: theme('spacing.md'),
        },
        '.inset-lg': {
          padding: theme('spacing.lg'),
        },
        '.inset-xl': {
          padding: theme('spacing.xl'),
        },
        
        // Squish insets (horizontal emphasis)
        '.inset-squish-xs': {
          paddingVertical: `calc(${theme('spacing.xs')} / 2)`,
          paddingHorizontal: theme('spacing.xs'),
        },
        '.inset-squish-sm': {
          paddingVertical: `calc(${theme('spacing.sm')} / 2)`,
          paddingHorizontal: theme('spacing.sm'),
        },
        '.inset-squish-md': {
          paddingVertical: `calc(${theme('spacing.md')} / 2)`,
          paddingHorizontal: theme('spacing.md'),
        },
        '.inset-squish-lg': {
          paddingVertical: `calc(${theme('spacing.lg')} / 2)`,
          paddingHorizontal: theme('spacing.lg'),
        },
        
        // Stretch insets (vertical emphasis)
        '.inset-stretch-xs': {
          paddingVertical: theme('spacing.xs'),
          paddingHorizontal: `calc(${theme('spacing.xs')} / 2)`,
        },
        '.inset-stretch-sm': {
          paddingVertical: theme('spacing.sm'),
          paddingHorizontal: `calc(${theme('spacing.sm')} / 2)`,
        },
        '.inset-stretch-md': {
          paddingVertical: theme('spacing.md'),
          paddingHorizontal: `calc(${theme('spacing.md')} / 2)`,
        },
        '.inset-stretch-lg': {
          paddingVertical: theme('spacing.lg'),
          paddingHorizontal: `calc(${theme('spacing.lg')} / 2)`,
        },
      };
      
      // Screen spacing utilities
      const screenSpacing = {
        '.screen-margin-horizontal': {
          marginLeft: theme('spacing.md'),
          marginRight: theme('spacing.md'),
        },
        '.screen-margin-vertical': {
          marginTop: theme('spacing.md'),
          marginBottom: theme('spacing.md'),
        },
        '.screen-padding-bottom': {
          paddingBottom: theme('spacing.lg'),
        },
        '.content-spacing': {
          gap: theme('spacing.lg'),
        },
        '.section-margin-bottom': {
          marginBottom: theme('spacing.xl'),
        },
      };
      
      // Component border utilities from borders.ts
      const componentBorders = {
        '.border-card': {
          borderWidth: theme('borderWidth.thin'),
          borderStyle: 'solid',
          borderRadius: theme('borderRadius.card'),
        },
        '.border-button': {
          borderWidth: theme('borderWidth.thin'),
          borderStyle: 'solid',
          borderRadius: theme('borderRadius.button'),
        },
        '.border-input': {
          borderWidth: theme('borderWidth.thin'),
          borderStyle: 'solid',
          borderRadius: theme('borderRadius.input'),
        },
        '.border-modal': {
          borderWidth: theme('borderWidth.none'),
          borderRadius: theme('borderRadius.modal'),
        },
        '.border-pill': {
          borderRadius: theme('borderRadius.pill'),
        },
        '.border-divider': {
          borderBottomWidth: theme('borderWidth.hairline'),
          borderStyle: 'solid',
        },
        '.border-avatar': {  // Added avatar border
          borderRadius: theme('borderRadius.avatar'),
        },
      };
      
      // Component shadow utilities from shadows.ts
      const componentShadows = {
        '.shadow-card': {
          boxShadow: theme('boxShadow.card'),
        },
        '.shadow-button': {
          boxShadow: theme('boxShadow.button'),
        },
        '.shadow-action-button': {
          boxShadow: theme('boxShadow.action-button'),
        },
        '.shadow-modal': {
          boxShadow: theme('boxShadow.modal'),
        },
        '.shadow-popover': {
          boxShadow: theme('boxShadow.popover'),
        },
        '.shadow-tooltip': {
          boxShadow: theme('boxShadow.tooltip'),
        },
        '.shadow-header': {
          boxShadow: theme('boxShadow.header'),
        },
        '.shadow-bottom-tab': {
          boxShadow: theme('boxShadow.bottom-tab'),
        },
        '.shadow-inner': {
          boxShadow: theme('boxShadow.inner'),
        },
        '.shadow-ambient': {
          boxShadow: theme('boxShadow.ambient'),
        },
        '.shadow-directional': {
          boxShadow: theme('boxShadow.directional'),
        },
        '.shadow-sharp': {
          boxShadow: theme('boxShadow.sharp'),
        },
      };
      
      addComponents(textStyles);
      addComponents(componentSpacing);
      addComponents(insets);
      addComponents(screenSpacing);
      addComponents(componentBorders);
      addComponents(componentShadows);
    },
  ],
};