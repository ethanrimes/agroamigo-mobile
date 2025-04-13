// src/components/ui/organization/VStack.tsx
import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface VStackProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const VStack: React.FC<VStackProps> = ({ 
  style, 
  children, 
  className, 
  space,
  ...props 
}) => {
  const { theme } = useTheme();
  
  // Get spacing value based on the theme
  const getSpacing = () => {
    if (!space) return 0;
    
    switch (space) {
      case 'xs': return theme.spacing.spacing.xs;
      case 'sm': return theme.spacing.spacing.sm;
      case 'md': return theme.spacing.spacing.md;
      case 'lg': return theme.spacing.spacing.lg;
      case 'xl': return theme.spacing.spacing.xl;
      case 'xxl': return theme.spacing.spacing.xxl;
      default: return theme.spacing.spacing.md;
    }
  };
  
  // Parse className for basic flexbox styling
  const getClassNameStyles = (className?: string) => {
    if (!className) return {};
    
    const styles: any = {};
    
    if (className.includes('w-full')) styles.width = '100%';
    if (className.includes('flex-1')) styles.flex = 1;
    if (className.includes('justify-center')) styles.justifyContent = 'center';
    if (className.includes('justify-end')) styles.justifyContent = 'flex-end';
    if (className.includes('justify-between')) styles.justifyContent = 'space-between';
    if (className.includes('items-center')) styles.alignItems = 'center';
    
    return styles;
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: getSpacing(),
    },
  });

  return (
    <View 
      style={[dynamicStyles.container, getClassNameStyles(className), style]} 
      {...props}
    >
      {children}
    </View>
  );
};

export default VStack;