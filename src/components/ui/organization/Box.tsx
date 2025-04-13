// src/components/ui/organization/Box.tsx
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface BoxProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ 
  style, 
  children, 
  className, 
  ...props 
}) => {
  // Parse className for basic flexbox styling
  // This is a simplified version - in a real app you would use a proper className parser
  const getClassNameStyles = (className?: string) => {
    if (!className) return {};
    
    const styles: any = {};
    
    if (className.includes('w-full')) styles.width = '100%';
    if (className.includes('h-8')) styles.height = 32;
    if (className.includes('w-8')) styles.width = 32;
    if (className.includes('h-120')) styles.height = 120;
    if (className.includes('h-130')) styles.height = 130;
    if (className.includes('h-150')) styles.height = 150;
    if (className.includes('w-140')) styles.width = 140;
    if (className.includes('rounded-full')) styles.borderRadius = 9999;
    if (className.includes('flex-1')) styles.flex = 1;
    if (className.includes('justify-center')) styles.justifyContent = 'center';
    if (className.includes('justify-end')) styles.justifyContent = 'flex-end';
    if (className.includes('justify-between')) styles.justifyContent = 'space-between';
    if (className.includes('items-center')) styles.alignItems = 'center';
    
    return styles;
  };

  return (
    <View 
      style={[getClassNameStyles(className), style]} 
      {...props}
    >
      {children}
    </View>
  );
};

export default Box;