// react-native-elements.ts

import { colors, typography, spacing, borders, shadows } from '../base';
import { ThemeOptions } from '@rneui/themed';
import { TextStyle } from 'react-native';

// Convert our theme to React Native Elements format
export const createRNETheme = (): ThemeOptions => {
  // Create the RNE theme
  return {
    colors: {
      primary: colors.primary.default,
      secondary: colors.secondary.default,
      background: colors.background.primary,
      white: colors.neutral.white,
      black: colors.neutral.black,
      grey0: '#303030',
      grey1: '#484848',
      grey2: '#606060',
      grey3: '#787878',
      grey4: '#909090',
      grey5: '#A8A8A8',
      greyOutline: '#BDBDBD',
      success: colors.action.success,
      error: colors.action.error,
      warning: colors.action.warning,
      searchBg: colors.background.secondary,
      disabled: '#BDBDBD',
      divider: '#E0E0E0',
      platform: {
        ios: {
          primary: colors.primary.default,
          secondary: colors.secondary.default,
          grey: colors.neutral.grey,
          success: colors.action.success,
          error: colors.action.error,
          warning: colors.action.warning,
          searchBg: colors.background.secondary,
        },
        android: {
          primary: colors.primary.default,
          secondary: colors.secondary.default,
          grey: colors.neutral.grey,
          success: colors.action.success,
          error: colors.action.error,
          warning: colors.action.warning,
          searchBg: colors.background.secondary,
        },
        web: {
          primary: colors.primary.default,
          secondary: colors.secondary.default,
          grey: colors.neutral.grey,
          success: colors.action.success,
          error: colors.action.error,
          warning: colors.action.warning,
          searchBg: colors.background.secondary,
        },
        default: {
          primary: colors.primary.default,
          secondary: colors.secondary.default,
          grey: colors.neutral.grey,
          success: colors.action.success,
          error: colors.action.error,
          warning: colors.action.warning,
          searchBg: colors.background.secondary,
        },
      },
    },
    mode: 'light',
    spacing: {
      xs: spacing.spacing.xs,
      sm: spacing.spacing.sm,
      md: spacing.spacing.md,
      lg: spacing.spacing.lg,
      xl: spacing.spacing.xl,
    },
    components: {
      Text: {
        style: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body2,
          color: colors.text.primary,
        },
        h1Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline1,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline1,
          color: colors.text.primary,
          marginBottom: spacing.spacing.lg,
        },
        h2Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline2,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline2,
          color: colors.text.primary,
          marginBottom: spacing.spacing.md,
        },
        h3Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline3,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline3,
          color: colors.text.primary,
          marginBottom: spacing.spacing.md,
        },
        h4Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline4,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline4,
          color: colors.text.primary,
          marginBottom: spacing.spacing.sm,
        },
      },
      Button: {
        raised: true,
        buttonStyle: {
          backgroundColor: colors.primary.default,
          borderRadius: borders.borderRadii.md,
          paddingVertical: spacing.spacing.sm,
          paddingHorizontal: spacing.spacing.md,
        },
        containerStyle: {
          ...shadows.shadows.sm,
        },
        titleStyle: {
          fontFamily: typography.fontFamilies.body,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          fontSize: typography.fontSizes.body2,
          letterSpacing: typography.letterSpacing.wide,
        },
        loadingProps: {
          color: colors.neutral.white,
          size: 'small',
        },
        loadingStyle: {
          opacity: 0.8,
        },
        disabledStyle: {
          backgroundColor: '#E0E0E0',
        },
        disabledTitleStyle: {
          color: '#9E9E9E',
        },
      },
      // Add other components as needed
    },
  };
};

// Export theme
export const rneTheme = createRNETheme();

export default rneTheme;
