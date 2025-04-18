import React from 'react';
import { View } from 'react-native';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  ...rest
}) => {
  const baseClass = orientation === 'horizontal' 
    ? 'w-full h-px bg-border-light' 
    : 'h-full w-px bg-border-light';
  
  return (
    <View 
      className={`${baseClass} ${className}`}
      {...rest}
    />
  );
};

export default Divider;