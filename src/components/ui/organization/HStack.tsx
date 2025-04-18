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
  // Map space values to Gluestack spacing
  const getSpaceClass = () => {
    if (!space) return '';
    
    // This will be combined with the provided className
    return `space-x-${space}`;
  };
  
  const combinedClass = `${getSpaceClass()} ${className || ''}`.trim();
  
  return (
    <GluestackHStack 
      className={combinedClass}
      style={style}
      {...props}
    >
      {children}
    </GluestackHStack>
  );
};

export default HStack;