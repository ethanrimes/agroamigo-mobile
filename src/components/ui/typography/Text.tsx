// src/components/ui/typography/Text.tsx
import React from 'react';
import { Text as GluestackText } from "@/components/ui/text";

export interface TypographyProps {
  variant?: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'body1' | 'body2' | 'body1Medium' | 'body2Medium' | 'caption';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  bold?: boolean;
  isTruncated?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  sub?: boolean;
  italic?: boolean;
  highlight?: boolean;
  style?: any;
  children?: React.ReactNode;
  numberOfLines?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color,
  align,
  size,
  bold = false,
  isTruncated = false,
  underline = false,
  strikeThrough = false,
  sub = false,
  italic = false,
  highlight = false,
  style,
  children,
  numberOfLines,
  ...rest
}) => {
  // Map variant to size and weight
  const getPropsFromVariant = () => {
    switch(variant) {
      case 'headline1': return { size: '4xl', fontWeight: 'bold' };
      case 'headline2': return { size: '3xl', fontWeight: 'bold' };
      case 'headline3': return { size: '2xl', fontWeight: 'bold' };
      case 'headline4': return { size: 'xl', fontWeight: 'bold' };
      case 'body1': return { size: 'md', fontWeight: 'normal' };
      case 'body2': return { size: 'sm', fontWeight: 'normal' };
      case 'body1Medium': return { size: 'md', fontWeight: 'medium' };
      case 'body2Medium': return { size: 'sm', fontWeight: 'medium' };
      case 'caption': return { size: 'xs', fontWeight: 'normal' };
      default: return { size: 'md', fontWeight: 'normal' };
    }
  };
  
  const variantProps = getPropsFromVariant();
  
  // Build the className based on props
  const getClassNames = () => {
    const classes = [];
    
    // Size
    const sizeClass = size || variantProps.size;
    classes.push(`text-${sizeClass}`);
    
    // Color
    if (color) {
      classes.push(color);
    }
    
    // Alignment
    if (align) {
      classes.push(`text-${align}`);
    }
    
    // Font weight
    if (bold || variantProps.fontWeight === 'bold') {
      classes.push('font-bold');
    } else if (variantProps.fontWeight === 'medium') {
      classes.push('font-medium');
    }
    
    // Text decoration
    if (underline && strikeThrough) {
      classes.push('underline line-through');
    } else if (underline) {
      classes.push('underline');
    } else if (strikeThrough) {
      classes.push('line-through');
    }
    
    // Font style
    if (italic) {
      classes.push('italic');
    }
    
    // Background
    if (highlight) {
      classes.push('bg-primary-100');
    }
    
    return classes.join(' ');
  };
  
  return (
    <GluestackText
      className={getClassNames()}
      style={style}
      numberOfLines={isTruncated ? 1 : numberOfLines}
      {...rest}
    >
      {children}
    </GluestackText>
  );
};

export default Typography;