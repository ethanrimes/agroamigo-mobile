// src/components/ui/typography/Text.tsx
import React from 'react';
import { Text as GluestackText } from "@/components/ui/text";
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
  style?: React.CSSProperties;
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
  
  return (
    <GluestackText
      style={[
        textStyle, 
        { color: textColor, textAlign }, 
        style as any
      ]}
      bold={bold}
      italic={italic}
      underline={underline}
      strikeThrough={strikeThrough}
      highlight={highlight}
      isTruncated={isTruncated}
      size={size}
      sub={sub}
      className={className}
      {...rest}
    >
      {children}
    </GluestackText>
  );
};

export default Typography;