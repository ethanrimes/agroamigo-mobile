// Shadow definitions for depth and elevation in UI elements
// Note: React Native shadows work differently from web CSS shadows

// Helper function to create consistent shadow objects for iOS and Android
const createShadow = (
    elevation: number, 
    opacity: number, 
    radius: number, 
    offsetX: number = 0, 
    offsetY: number = elevation / 2,
    color: string = '#000000'
  ) => {
    return {
      // iOS shadow properties
      shadowColor: color,
      shadowOffset: {
        width: offsetX,
        height: offsetY,
      },
      shadowOpacity: opacity,
      shadowRadius: radius,
      
      // Android shadow (elevation)
      elevation,
    };
  };
  
  // Shadow tokens with increasing intensity
  export const shadows = {
    // No shadow
    none: createShadow(0, 0, 0, 0, 0),
    
    // Extra small shadow (subtle)
    xs: createShadow(1, 0.15, 1.5, 0, 1),
    
    // Small shadow (buttons, cards)
    sm: createShadow(2, 0.2, 2.5, 0, 2),
    
    // Medium shadow (floating action buttons, active elements)
    md: createShadow(4, 0.22, 3.5, 0, 3),
    
    // Large shadow (modals, dialogs)
    lg: createShadow(8, 0.25, 8, 0, 4),
    
    // Extra large shadow (popovers, tooltips)
    xl: createShadow(16, 0.3, 12, 0, 8),
    
    // 2x extra large shadow (for dramatic emphasis)
    xxl: createShadow(24, 0.35, 16, 0, 12),
  };
  
  // Elevation levels map to conventional material design elevations
  export const elevations = {
    level0: shadows.none,   // Flat elements
    level1: shadows.xs,     // Slightly raised 
    level2: shadows.sm,     // Cards, buttons
    level3: shadows.md,     // Menus, bottom sheets
    level4: shadows.lg,     // Floating action buttons
    level5: shadows.xl,     // Modals, dialogs
    level6: shadows.xxl,    // Front layer elements
  };
  
  // Component-specific shadows
  export const componentShadows = {
    card: shadows.sm,
    button: shadows.xs,
    actionButton: shadows.md,
    activeElement: shadows.md,
    modal: shadows.lg,
    popover: shadows.xl,
    tooltip: {
      ...shadows.md,
      shadowOpacity: 0.18, // More subtle for tooltips
    },
    header: {
      ...shadows.sm,
      shadowOpacity: 0.12, // Subtle header shadow
    },
    bottomTab: {
      ...shadows.sm,
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: -2 }, // Shadow at the top (for bottom tabs)
    },
  };
  
  // Special shadow effects
  export const shadowEffects = {
    // Inner shadow effect (approximation in React Native)
    innerShadow: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    
    // Ambient shadow (very soft, wide spread)
    ambientShadow: createShadow(4, 0.12, 16, 0, 4),
    
    // Directional shadow (coming from an angle)
    directionalShadow: {
      ...createShadow(6, 0.25, 8, 4, 4),
      shadowOffset: { width: 4, height: 4 }, // Shadow from top-left
    },
    
    // Sharp shadow (more defined edge)
    sharpShadow: {
      ...createShadow(6, 0.3, 3, 0, 6),
      shadowRadius: 3, // Smaller radius for sharper shadow
    },
  };
  
  export default {
    createShadow,
    shadows,
    elevations,
    componentShadows,
    shadowEffects,
  };