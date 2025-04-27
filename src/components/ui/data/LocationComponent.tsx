// src/components/ui/data/LocationComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import HStack from '@/src/components/ui/layout/HStack';
import { MapPin } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface LocationComponentProps {
  location: string;
}

export const LocationComponent: React.FC<LocationComponentProps> = ({ 
  location 
}) => {
  const { theme } = useTheme();
  
  return (
    <HStack className="items-center justify-center space-x-2 py-1">
      <MapPin size={18} color={theme.colors.text.primary} />
      <Text style={{ color: theme.colors.text.primary }} className="text-base">
        {location}
      </Text>
    </HStack>
  );
};

export default LocationComponent;