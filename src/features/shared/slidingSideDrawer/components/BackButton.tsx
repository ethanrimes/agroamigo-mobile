// src/features/shared/slidingSideDrawer/components/BackButton.tsx
import React from 'react';
import { BackButton as UIBackButton } from '@/src/components/ui/buttons';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface BackButtonProps {
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  
  return (
    <UIBackButton 
      onPress={onPress} 
      color={colors.text.inverse} // White icon for visibility on dark header
      size={28} // Slightly larger for better visibility
    />
  );
};

export default BackButton;