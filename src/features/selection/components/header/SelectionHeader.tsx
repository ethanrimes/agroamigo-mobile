// src/features/selection/components/header/SelectionHeader.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import SearchLocationContainer from '@/src/features/home/components/header/SearchLocationContainer';
import ThinHeaderStrip from './ThinHeaderStrip';

interface SelectionHeaderProps {
  title: string;
  subtitle?: string;
  location: string;
  onFilterPress?: () => void;
  onSearchPress?: () => void;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  title,
  subtitle = 'Explorar y entender últimos precios',
  location,
  onFilterPress,
  onSearchPress,
}) => {
  return (
    <VStack className="w-full">
      <ThinHeaderStrip onFilterPress={onFilterPress} />
      
      <Box className="w-full px-4 py-4">
        <VStack className="w-full space-y-2">
          <Text className="text-2xl font-semibold text-neutral-black">{title}</Text>
          <Text className="text-base text-neutral-grey">{subtitle}</Text>
          
          <Box className="pt-4">
            <SearchLocationContainer 
              location={location}
              onSearchPress={onSearchPress}
            />
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default SelectionHeader;