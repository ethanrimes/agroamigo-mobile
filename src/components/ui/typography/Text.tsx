// src/components/ui/typography/Text.tsx
import React from 'react';
import { Text } from '@rneui/themed';
import { TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

export interface TypographyProps {
  variant?: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 
            'body1' | 'body1Medium' | 'body2' | 'body2Medium' | 
            'body3' | 'body3Medium' | 'body4' | 
            'caption' | 'button' | 'link' | 'code';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children?: React.ReactNode;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  highlight?: boolean;
  isTruncated?: boolean;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  style?: object;
  sub?: boolean;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body2',
  color,
  align,
  style,
  children,
  bold = false,
  italic = false,
  underline = false,
  strikeThrough = false,
  highlight = false,
  isTruncated = false,
  size,
  sub = false,
  className,
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
  
  // Create styles with proper typing
  const styles = StyleSheet.create({
    text: {
      color: textColor,
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      lineHeight: textStyle.lineHeight,
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
    },
    subText: {
      fontSize: textStyle.fontSize * 0.75,
      lineHeight: (textStyle.lineHeight || 0) * 0.75,
    }
  });
  
  if (sub) {
    return (
      <Text style={[styles.text, style]} numberOfLines={isTruncated ? 1 : undefined} {...rest}>
        <Text style={styles.subText}>{children}</Text>
      </Text>
    );
  }
  
  return (
    <Text
      style={[styles.text, style]}
      numberOfLines={isTruncated ? 1 : undefined}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;