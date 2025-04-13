// Adapter for React Native Elements
import { colors, typography, spacing, borders, shadows } from '../base';
import { ThemeOptions } from '@rneui/themed';
import { TextStyle } from 'react-native';

// Convert our theme to React Native Elements format
export const createRNETheme = (isDark: boolean = false): ThemeOptions => {
  const themeColors = isDark ? colors.dark : colors.light;
  
  // Create the RNE theme
  return {
    colors: {
      primary: themeColors.primary.default,
      secondary: themeColors.secondary.default,
      background: themeColors.background.primary,
      white: themeColors.neutral.white,
      black: themeColors.neutral.black,
      grey0: isDark ? '#C8C8C8' : '#303030',
      grey1: isDark ? '#B0B0B0' : '#484848',
      grey2: isDark ? '#989898' : '#606060',
      grey3: isDark ? '#808080' : '#787878',
      grey4: isDark ? '#686868' : '#909090',
      grey5: isDark ? '#505050' : '#A8A8A8',
      greyOutline: isDark ? '#484848' : '#BDBDBD',
      success: themeColors.action.success,
      error: themeColors.action.error,
      warning: themeColors.action.warning,
      searchBg: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
      disabled: isDark ? '#606060' : '#BDBDBD',
      divider: isDark ? '#404040' : '#E0E0E0',
      platform: {
        ios: {
          primary: themeColors.primary.default,
          secondary: themeColors.secondary.default,
          grey: themeColors.neutral.grey,
          success: themeColors.action.success,
          error: themeColors.action.error,
          warning: themeColors.action.warning,
          searchBg: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
        },
        android: {
          primary: themeColors.primary.default,
          secondary: themeColors.secondary.default,
          grey: themeColors.neutral.grey,
          success: themeColors.action.success,
          error: themeColors.action.error,
          warning: themeColors.action.warning,
          searchBg: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
        },
        web: {
          primary: themeColors.primary.default,
          secondary: themeColors.secondary.default,
          grey: themeColors.neutral.grey,
          success: themeColors.action.success,
          error: themeColors.action.error,
          warning: themeColors.action.warning,
          searchBg: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
        },
        default: {
          primary: themeColors.primary.default,
          secondary: themeColors.secondary.default,
          grey: themeColors.neutral.grey,
          success: themeColors.action.success,
          error: themeColors.action.error,
          warning: themeColors.action.warning,
          searchBg: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
        },
      },
    },
    mode: isDark ? 'dark' : 'light',
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
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
        },
        h1Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline1,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline1,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          marginBottom: spacing.spacing.lg,
        },
        h2Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline2,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline2,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          marginBottom: spacing.spacing.md,
        },
        h3Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline3,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline3,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          marginBottom: spacing.spacing.md,
        },
        h4Style: {
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline4,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
          lineHeight: typography.lineHeights.headline4,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          marginBottom: spacing.spacing.sm,
        },
      },
      Button: {
        raised: true,
        buttonStyle: {
          backgroundColor: themeColors.primary.default,
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
          color: themeColors.neutral.white,
          size: 'small',
        },
        loadingStyle: {
          opacity: 0.8,
        },
        disabledStyle: {
          backgroundColor: isDark ? '#404040' : '#E0E0E0',
        },
        disabledTitleStyle: {
          color: isDark ? '#808080' : '#9E9E9E',
        },
      },
      Input: {
        containerStyle: {
          paddingHorizontal: 0,
        },
        inputContainerStyle: {
          borderBottomWidth: borders.borderWidths.thin,
          borderBottomColor: isDark ? themeColors.border.light : themeColors.border.default,
        },
        inputStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body2,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          paddingVertical: spacing.spacing.xs,
        },
        labelStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body3,
          color: isDark ? themeColors.text.secondary : themeColors.text.secondary,
          fontWeight: String(typography.fontWeights.medium) as TextStyle['fontWeight'],
        },
        errorStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body4,
          color: themeColors.action.error,
          marginBottom: spacing.spacing.xs,
          marginTop: 0,
        },
      },
      Card: {
        containerStyle: {
          borderRadius: borders.borderRadii.lg,
          padding: spacing.spacing.md,
          margin: spacing.spacing.sm,
          ...shadows.shadows.sm,
          backgroundColor: isDark ? themeColors.background.secondary : themeColors.background.primary,
          borderWidth: isDark ? 0 : borders.borderWidths.thin,
          borderColor: isDark ? 'transparent' : themeColors.border.light,
        },
        // For titleStyle, we need to handle it differently
        // React Native Elements v4 uses wrapperStyle instead of titleStyle
        wrapperStyle: {
          padding: spacing.spacing.sm,
        },
        // We can apply the title style in the Card.Title component instead
      },
      Icon: {
        size: 24,
        color: isDark ? themeColors.text.primary : themeColors.text.primary,
      },
      ListItem: {
        containerStyle: {
          backgroundColor: 'transparent',
          paddingVertical: spacing.spacing.sm,
          borderBottomWidth: borders.borderWidths.hairline,
          borderBottomColor: isDark ? themeColors.border.light : themeColors.border.default,
        },
        // For ListItem, we'll handle styling through the component props
        // The ListItem.Title and ListItem.Subtitle components should be used for text styling
      },
      Avatar: {
        rounded: true,
        size: 'medium',
        overlayContainerStyle: {
          backgroundColor: themeColors.primary.default,
        },
        titleStyle: {
          color: themeColors.neutral.white,
          fontWeight: String(typography.fontWeights.medium) as TextStyle['fontWeight'],
        },
      },
      Badge: {
        badgeStyle: {
          borderRadius: borders.borderRadii.sm,
          paddingHorizontal: spacing.spacing.xs,
          height: 20,
        },
        textStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.xs,
          fontWeight: String(typography.fontWeights.medium) as TextStyle['fontWeight'],
        },
      },
      SearchBar: {
        platform: 'default',
        containerStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          paddingHorizontal: spacing.spacing.md,
          paddingVertical: spacing.spacing.sm,
        },
        inputContainerStyle: {
          backgroundColor: isDark ? themeColors.background.tertiary : themeColors.background.secondary,
          borderRadius: borders.borderRadii.round,
          height: 40,
        },
        inputStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body2,
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
        },
        searchIcon: {
          size: 20,
          color: isDark ? themeColors.text.tertiary : themeColors.text.tertiary,
        },
        clearIcon: {
          size: 20,
          color: isDark ? themeColors.text.tertiary : themeColors.text.tertiary,
        },
      },
      Divider: {
        style: {
          backgroundColor: isDark ? themeColors.border.light : themeColors.border.default,
          marginVertical: spacing.spacing.md,
        },
      },
      Tab: {
        indicatorStyle: {
          backgroundColor: themeColors.primary.default,
          height: 3,
        },
        // For Tab, use the right properties according to Tab API
        // In React Native Elements v4, labelStyle is not in the Tab component
        // but in Button component that's used within Tab
        buttonStyle: {
          backgroundColor: 'transparent',
        },
      },
      CheckBox: {
        containerStyle: {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        textStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body2,
          fontWeight: String(typography.fontWeights.regular) as TextStyle['fontWeight'],
          color: isDark ? themeColors.text.primary : themeColors.text.primary,
          marginLeft: spacing.spacing.xs,
        },
        checkedColor: themeColors.primary.default,
        uncheckedColor: isDark ? themeColors.text.tertiary : themeColors.text.tertiary,
      },
      ButtonGroup: {
        containerStyle: {
          borderRadius: borders.borderRadii.md,
          borderColor: themeColors.primary.default,
          backgroundColor: 'transparent',
        },
        selectedButtonStyle: {
          backgroundColor: themeColors.primary.default,
        },
        selectedTextStyle: {
          color: themeColors.neutral.white,
          fontWeight: String(typography.fontWeights.semiBold) as TextStyle['fontWeight'],
        },
        textStyle: {
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body3,
          color: themeColors.primary.default,
        },
        innerBorderStyle: {
          color: themeColors.primary.default,
        },
      },
    },
  };
};

// Export themes for light and dark mode
export const rneLightTheme = createRNETheme(false);
export const rneDarkTheme = createRNETheme(true);

export default {
  light: rneLightTheme,
  dark: rneDarkTheme,
};