// Typography definitions based on the design system

// Font families
export const fontFamilies = {
    heading: 'Inter-SemiBold', // For headlines/headings
    body: 'Inter-Regular',     // For body text
    mono: 'RobotoMono-Regular', // For code or special text
  };
  
  // Font sizes (based on the provided design)
  export const fontSizes = {
    // Headline font sizes
    headline1: 64,
    headline2: 36,
    headline3: 28,
    headline4: 20,
    
    // Body font sizes
    body1: 18,
    body2: 16,
    body3: 14,
    body4: 12,
    
    // Additional sizes
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 36,
    jumbo: 48,
    massive: 64,
  };
  
  // Font weights
  export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  };
  
  // Line heights
  export const lineHeights = {
    // Headline line heights (matching the provided design)
    headline1: 76, // 64/76
    headline2: 44, // 36/44
    headline3: 36, // 28/36
    headline4: 28, // 20/28
    
    // Body line heights
    body1: 28, // 18/28
    body2: 24, // 16/24
    body3: 20, // 14/20
    body4: 16, // 12/16
    
    // Relative line heights (multipliers)
    tight: 1.1,    // Compact
    normal: 1.25,  // Default
    relaxed: 1.5,  // More spacious
    loose: 1.75,   // Very spacious
  };
  
  // Letter spacing
  export const letterSpacing = {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  };
  
  // Text transformations
  export const textTransforms = {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    normal: 'none',
  };
  
  // Text alignments
  export const textAlignments = {
    left: 'left',
    center: 'center',
    right: 'right',
    justify: 'justify',
  };
  
  // Predefined text styles that combine the above properties
  export const textStyles = {
    // Headline styles
    headline1: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes.headline1,
      lineHeight: lineHeights.headline1,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
    },
    headline2: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes.headline2,
      lineHeight: lineHeights.headline2,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
    },
    headline3: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes.headline3,
      lineHeight: lineHeights.headline3,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
    },
    headline4: {
      fontFamily: fontFamilies.heading,
      fontSize: fontSizes.headline4,
      lineHeight: lineHeights.headline4,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.normal,
    },
    
    // Body styles
    body1: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body1,
      lineHeight: lineHeights.body1,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
    body1Medium: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body1,
      lineHeight: lineHeights.body1,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
    },
    body2: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
    body2Medium: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
    },
    body3: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body3,
      lineHeight: lineHeights.body3,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
    body3Medium: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body3,
      lineHeight: lineHeights.body3,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
    },
    body4: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.body4,
      lineHeight: lineHeights.body4,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
    
    // Special text styles
    caption: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.tight,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
    button: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.semiBold,
      letterSpacing: letterSpacing.wide,
      textTransform: textTransforms.uppercase,
    },
    link: {
      fontFamily: fontFamilies.body,
      fontSize: fontSizes.md,
      lineHeight: lineHeights.normal,
      fontWeight: fontWeights.medium,
      letterSpacing: letterSpacing.normal,
    },
    code: {
      fontFamily: fontFamilies.mono,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.relaxed,
      fontWeight: fontWeights.regular,
      letterSpacing: letterSpacing.normal,
    },
  };
  
  export default {
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacing,
    textTransforms,
    textAlignments,
    textStyles,
  };