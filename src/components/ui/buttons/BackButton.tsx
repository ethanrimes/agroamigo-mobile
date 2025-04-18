import React from 'react';
import { Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface BackButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onPress, 
  size = 24, 
  color 
}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable 
      onPress={onPress}
      className="p-2"
    >
      <ChevronLeft 
        size={size} 
        color={color || colors.neutral.black} 
      />
    </Pressable>
  );
};

export default BackButton;