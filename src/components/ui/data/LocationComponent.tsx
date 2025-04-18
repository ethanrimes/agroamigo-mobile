// src/components/ui/data/LocationComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { MapPin } from 'lucide-react-native';

interface LocationComponentProps {
  location: string;
}

export const LocationComponent: React.FC<LocationComponentProps> = ({ 
  location 
}) => {
  return (
    <HStack className="items-center justify-center space-x-2 py-1">
      <MapPin size={18} color="#FFFFFF" />
      <Text className="text-white text-base">
        {location}
      </Text>
    </HStack>
  );
};

export default LocationComponent;