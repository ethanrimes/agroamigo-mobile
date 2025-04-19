// src/components/ui/organization/VStack.tsx
import React from 'react';
import { VStack as GluestackVStack } from "@/components/ui/vstack";

interface VStackProps {
  className?: string;
  children?: React.ReactNode;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  style?: any;
}

const VStack: React.FC<VStackProps> = ({ 
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
    return `space-y-${space}`;
  };
  
  const combinedClass = `${getSpaceClass()} ${className || ''}`.trim();
  
  return (
    <GluestackVStack 
      className={combinedClass}
      style={style}
      {...props}
    >
      {children}
    </GluestackVStack>
  );
};

export default VStack;