// src/components/ui/organization/Box.tsx
import React from 'react';
import { Box as GluestackBox } from "@/components/ui/box";

interface BoxProps {
  className?: string;
  children?: React.ReactNode;
  style?: any;
}

const Box: React.FC<BoxProps> = ({ 
  className, 
  children, 
  style,
  ...props 
}) => {
  return (
    <GluestackBox 
      className={className} 
      style={style} 
      {...props}
    >
      {children}
    </GluestackBox>
  );
};

export default Box;