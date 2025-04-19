// src/components/ui/organization/HStack.tsx
import React from 'react';
import { HStack as GluestackHStack } from "@/components/ui/hstack";

interface HStackProps {
  className?: string;
  children?: React.ReactNode;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  style?: any;
}

const HStack: React.FC<HStackProps> = ({ 
  className, 
  children, 
  space,
  style,
  ...props 
}) => {
  // Map your space values to GluestackHStack's expected values
  const mapSpace = () => {
    if (!space) return undefined;
    
    // Map your xxl to 2xl which GluestackHStack expects
    if (space === 'xxl') return '2xl';
    
    // All other values are the same
    return space;
  };
  
  return (
    <GluestackHStack 
      className={className || ''}
      space={mapSpace()} // Use the mapped space value
      style={style}
      {...props}
    >
      {children}
    </GluestackHStack>
  );
};

export default HStack;