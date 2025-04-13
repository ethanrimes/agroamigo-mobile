// src/components/ui/icons/Logo.tsx
import React from 'react';
import { Image } from 'react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'medium' 
}) => {
  const { theme } = useTheme();
  
  // Define sizes based on the theme spacing
  const sizes = {
    small: theme.spacing.spacing[8], // Using numerical values instead
    medium: theme.spacing.spacing[16], // Using numerical values instead
    large: theme.spacing.spacing[32], // Using numerical values instead
  };
  
  // Calculate dimensions based on selected size
  const dimension = sizes[size];
  
  return (
    <Image
      source={require('../../../assets/images/temp_logo.png')}
      style={{
        width: dimension,
        height: dimension,
        resizeMode: 'contain',
      }}
    />
  );
};

export default Logo;