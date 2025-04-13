// Border definitions for UI elements

// Border widths
export const borderWidths = {
    none: 0,
    hairline: 0.5, // React Native's hairline width
    thin: 1,
    medium: 2,
    thick: 3,
    heavy: 4,
  };
  
  // Border styles
  export const borderStyles = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  };
  
  // Border radii
  export const borderRadii = {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 1000, // Very high value to ensure fully rounded corners where needed
    circle: '50%', // For circular elements
  };
  
  // Specific border radii for different component types
  export const componentBorderRadii = {
    button: borderRadii.md,
    card: borderRadii.lg,
    input: borderRadii.sm,
    modal: borderRadii.lg,
    pill: borderRadii.round,
    avatar: borderRadii.circle,
    tag: borderRadii.sm,
    tooltip: borderRadii.sm,
  };
  
  // Predefined border configurations
  export const borders = {
    none: {
      borderWidth: borderWidths.none,
      borderStyle: borderStyles.solid,
    },
    thin: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.solid,
    },
    medium: {
      borderWidth: borderWidths.medium,
      borderStyle: borderStyles.solid,
    },
    thick: {
      borderWidth: borderWidths.thick,
      borderStyle: borderStyles.solid,
    },
    dashed: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.dashed,
    },
    dotted: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.dotted,
    },
  };
  
  // Border directions (for specific side borders)
  export const borderDirections = {
    all: {
      borderWidth: borderWidths.thin,
    },
    top: {
      borderTopWidth: borderWidths.thin,
    },
    right: {
      borderRightWidth: borderWidths.thin,
    },
    bottom: {
      borderBottomWidth: borderWidths.thin,
    },
    left: {
      borderLeftWidth: borderWidths.thin,
    },
    horizontal: {
      borderLeftWidth: borderWidths.thin,
      borderRightWidth: borderWidths.thin,
    },
    vertical: {
      borderTopWidth: borderWidths.thin,
      borderBottomWidth: borderWidths.thin,
    },
  };
  
  // Common component border presets
  export const componentBorders = {
    card: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.solid,
      borderRadius: componentBorderRadii.card,
    },
    button: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.solid,
      borderRadius: componentBorderRadii.button,
    },
    input: {
      borderWidth: borderWidths.thin,
      borderStyle: borderStyles.solid,
      borderRadius: componentBorderRadii.input,
    },
    modal: {
      borderWidth: borderWidths.none,
      borderRadius: componentBorderRadii.modal,
    },
    pill: {
      borderRadius: componentBorderRadii.pill,
    },
    divider: {
      borderBottomWidth: borderWidths.hairline,
      borderStyle: borderStyles.solid,
    },
  };
  
  export default {
    borderWidths,
    borderStyles,
    borderRadii,
    componentBorderRadii,
    borders,
    borderDirections,
    componentBorders,
  };