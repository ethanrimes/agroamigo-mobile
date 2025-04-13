// Spacing system for consistent layout and component spacing

// Base spacing unit (in pixels)
const baseSpacingUnit = 4;

// Spacing scale based on multiples of the base unit
export const spacing = {
  // Core spacing values
  none: 0,
  xs: baseSpacingUnit, // 4px
  sm: baseSpacingUnit * 2, // 8px
  md: baseSpacingUnit * 4, // 16px
  lg: baseSpacingUnit * 6, // 24px
  xl: baseSpacingUnit * 8, // 32px
  xxl: baseSpacingUnit * 12, // 48px
  xxxl: baseSpacingUnit * 16, // 64px
  
  // Additional specific values
  '0': 0,
  '1': baseSpacingUnit / 2, // 2px
  '2': baseSpacingUnit, // 4px
  '3': baseSpacingUnit * 1.5, // 6px
  '4': baseSpacingUnit * 2, // 8px
  '5': baseSpacingUnit * 3, // 12px
  '6': baseSpacingUnit * 4, // 16px
  '7': baseSpacingUnit * 5, // 20px
  '8': baseSpacingUnit * 6, // 24px
  '9': baseSpacingUnit * 7, // 28px
  '10': baseSpacingUnit * 8, // 32px
  '12': baseSpacingUnit * 12, // 48px
  '16': baseSpacingUnit * 16, // 64px
  '20': baseSpacingUnit * 20, // 80px
  '24': baseSpacingUnit * 24, // 96px
  '32': baseSpacingUnit * 32, // 128px
};

// Insets (for consistent padding)
export const insets = {
  // Default insets pattern (all sides equal)
  xs: {
    padding: spacing.xs,
  },
  sm: {
    padding: spacing.sm,
  },
  md: {
    padding: spacing.md,
  },
  lg: {
    padding: spacing.lg,
  },
  xl: {
    padding: spacing.xl,
  },
  
  // Asymmetric insets (different values for horizontal/vertical)
  squish: {
    xs: {
      paddingVertical: spacing.xs / 2,
      paddingHorizontal: spacing.xs,
    },
    sm: {
      paddingVertical: spacing.sm / 2,
      paddingHorizontal: spacing.sm,
    },
    md: {
      paddingVertical: spacing.md / 2,
      paddingHorizontal: spacing.md,
    },
    lg: {
      paddingVertical: spacing.lg / 2,
      paddingHorizontal: spacing.lg,
    },
  },
  
  // Stretch insets (vertical emphasis)
  stretch: {
    xs: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs / 2,
    },
    sm: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm / 2,
    },
    md: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md / 2,
    },
    lg: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg / 2,
    },
  },
};

// Layout gutters
export const gutters = {
  xs: spacing.xs, // 4px
  sm: spacing.sm, // 8px
  md: spacing.md, // 16px
  lg: spacing.lg, // 24px
  xl: spacing.xl, // 32px
};

// Screen-specific spacing
export const screenSpacing = {
  // Horizontal screen margins
  screenMarginHorizontal: spacing.md, // 16px
  
  // Vertical screen spacing
  screenMarginVertical: spacing.md, // 16px
  screenPaddingBottom: spacing.lg, // 24px
  
  // Content sections
  contentSpacing: spacing.lg, // 24px between major content blocks
  
  // Section spacing
  sectionMarginBottom: spacing.xl, // 32px
};

// Component-specific spacing
export const componentSpacing = {
  // Card component spacing
  cardPadding: spacing.md, // 16px
  cardMarginBottom: spacing.md, // 16px
  
  // Form elements
  formGroupMarginBottom: spacing.md, // 16px
  inputPaddingVertical: spacing.sm, // 8px
  inputPaddingHorizontal: spacing.md, // 16px
  
  // List items
  listItemPadding: spacing.md, // 16px
  listItemSpacing: spacing.sm, // 8px between items
  
  // Buttons
  buttonPaddingVertical: spacing.sm, // 8px
  buttonPaddingHorizontal: spacing.md, // 16px
  
  // Icons
  iconMargin: spacing.xs, // 4px
};

export default {
  baseSpacingUnit,
  spacing,
  insets,
  gutters,
  screenSpacing,
  componentSpacing,
};