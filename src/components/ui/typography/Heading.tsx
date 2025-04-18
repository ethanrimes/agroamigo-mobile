// src/components/ui/typography/Heading.tsx
import React from 'react';
import { Heading as GluestackHeading } from "@/components/ui/heading";

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
  className?: string;
  children?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  variant = 'headline3',
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
  className = '',
  children,
  ...rest
}) => {
  // Map variant to size
  const getSizeFromVariant = () => {
    switch(variant) {
      case 'headline1': return '4xl';
      case 'headline2': return '3xl';
      case 'headline3': return '2xl';
      case 'headline4': return 'xl';
      default: return '2xl';
    }
  };
  
  // Build the className based on props
  const getClassNames = () => {
    const classes = [];
    
    // Size
    const sizeClass = size || getSizeFromVariant();
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
    if (bold) {
      classes.push('font-bold');
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
  
  // Combine custom classNames with prop-based classes
  const combinedClassNames = `${getClassNames()} ${className}`;
  
  // Only pass valid props to the GluestackHeading component
  const headingProps = {
    className: combinedClassNames,
    style,
    isTruncated,
    // Map to supported size (convert from variant if needed)
    size: size || getSizeFromVariant(),
    bold,
    underline,
    strikeThrough,
    sub,
    italic,
    highlight,
    ...rest
  };
  
  return (
    <GluestackHeading {...headingProps}>
      {children}
    </GluestackHeading>
  );
};

export default Heading;