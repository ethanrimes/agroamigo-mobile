// src/components/ui/typography/Heading.tsx
import React from 'react';
import { Heading as GluestackHeading } from "@/components/ui/heading";
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
  
  // Map our variant to GluestackUI size
  const sizeMap: Record<string, HeadingProps['size']> = {
    headline1: '5xl',
    headline2: '3xl',
    headline3: '2xl',
    headline4: 'xl',
  };
  
  // Use provided size or map from variant
  const headingSize = size || sizeMap[variant];
  
  // Get the text style from theme
  const textStyle = theme.typography.textStyles[variant];
  
  // Get text color from props or theme
  const textColor = color || theme.colors.text.primary;
  
  // Get text alignment from props or theme
  const textAlign = align || theme.typography.textAlignments.left;
  
  return (
    <GluestackHeading
      size={headingSize}
      bold={bold}
      isTruncated={isTruncated}
      underline={underline}
      strikeThrough={strikeThrough}
      sub={sub}
      italic={italic}
      highlight={highlight}
      style={[
        textStyle, 
        { color: textColor, textAlign }, 
        style
      ]}
      {...rest}
    >
      {children}
    </GluestackHeading>
  );
};

export default Heading;