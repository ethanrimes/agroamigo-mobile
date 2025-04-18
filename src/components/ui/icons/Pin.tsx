// src/components/ui/icons/Pin.tsx
import React from 'react';
import { ViewStyle } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface PinProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Pin: React.FC<PinProps> = ({ 
  size = 24, 
  color,
  style,
}) => {
  const { theme } = useTheme();

  // Use provided color or default from theme
  const iconColor = color || theme.colors.primary.default;

  return (
    <MapPin 
      size={size} 
      strokeWidth={2}
      color={iconColor}
      style={style}
    />
  );
};

export default Pin;