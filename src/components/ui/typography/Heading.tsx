// src/components/ui/typography/Heading.tsx
import React from 'react';
import { Text } from '@rneui/themed';
import { TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

export interface HeadingProps {
  variant?: 'headline1' | 'headline2' | 'headline3' | 'headline4';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  bold?: boolean;
  isTruncated?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  sub?: boolean;
  italic?: boolean;
  highlight?: boolean;
  style?: any;
  children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = 'headline3',
  color,
  align,
  style,
  size,
  bold = false,
  isTruncated = false,
  underline = false,
  strikeThrough = false,
  sub = false,
  italic = false,
  highlight = false,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  
  // Get the text style from theme
  const textStyle = theme.typography.textStyles[variant];
  
  // Get text color from props or theme
  const textColor = color || theme.colors.text.primary;
  
  // Get text alignment from props or theme
  const textAlign = align || theme.typography.textAlignments.left;
  
  // Calculate font weight based on bold prop and text style
  const fontWeight = bold ? '700' : (textStyle.fontWeight as TextStyle['fontWeight']);
  
  // Create a style object for the heading
  const styles = StyleSheet.create({
    heading: {
      ...textStyle,
      color: textColor,
      textAlign: textAlign as TextStyle['textAlign'],
      fontWeight: fontWeight,
      textDecorationLine: underline 
        ? strikeThrough 
          ? 'underline line-through' 
          : 'underline'
        : strikeThrough 
          ? 'line-through' 
          : 'none',
      fontStyle: italic ? 'italic' : 'normal',
      backgroundColor: highlight ? theme.colors.primary.light : undefined,
    }
  });

  // Get fontSize based on variant
  const getFontSize = () => {
    switch(variant) {
      case 'headline1': return theme.typography.fontSizes.headline1;
      case 'headline2': return theme.typography.fontSizes.headline2;
      case 'headline3': return theme.typography.fontSizes.headline3;
      case 'headline4': return theme.typography.fontSizes.headline4;
      default: return theme.typography.fontSizes.headline3;
    }
  };
  
  return (
    <Text
      style={[styles.heading, { fontSize: getFontSize() }, style]}
      numberOfLines={isTruncated ? 1 : undefined}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Heading;