import React from 'react';
import { BackButton } from '@/src/components/ui/buttons';
import { useSelectionFilters } from '@/src/features/selection/hooks/useSelectionFilters';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface BackButtonWrapperProps {
  onPress?: () => void;
}

const BackButtonWrapper: React.FC<BackButtonWrapperProps> = ({ onPress }) => {
  const { closeFilters } = useSelectionFilters();
  const { colors } = useTheme();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      closeFilters();
    }
  };
  
  return (
    <BackButton 
      onPress={handlePress} 
      color={colors.text.inverse} // White icon for visibility on dark header
      size={28} // Slightly larger for better visibility
    />
  );
};

export default BackButtonWrapper;