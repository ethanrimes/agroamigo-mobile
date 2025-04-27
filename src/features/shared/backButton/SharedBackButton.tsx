import React from 'react';
import BackButton from '@/src/components/ui/buttons/BackButton';
import { useNavigationService } from '@/src/services/navigation';

interface SharedBackButtonProps {
  size?: number;
  color?: string;
}

/**
 * A wrapper around the BackButton component that uses NavigationService
 * to navigate to the previously visited page when clicked.
 */
const SharedBackButton: React.FC<SharedBackButtonProps> = ({ 
  size, 
  color 
}) => {
  const { navigateBack } = useNavigationService();
  
  const handlePress = () => {
    navigateBack();
  };
  
  return (
    <BackButton 
      onPress={handlePress}
      size={size}
      color={color}
    />
  );
};

export default SharedBackButton;