// src/features/home/components/header/SearchLocationContainer.tsx
import React from 'react';
import { View } from 'react-native';
import VStack from '@/src/components/ui/organization/VStack';
import Box from '@/src/components/ui/organization/Box';
import { SearchBar } from '@/src/components/ui/search';
import { LocationComponent } from '@/src/components/ui/data';

interface SearchLocationContainerProps {
  location: string;
  onSearchPress?: () => void;
}

const SearchLocationContainer: React.FC<SearchLocationContainerProps> = ({
  location,
  onSearchPress,
}) => {
  return (
    <VStack
      className="w-full space-y-4"
    >
      {/* Narrower SearchBar */}
      <Box className="w-full flex items-center justify-center">
        <Box className="w-4/5">
          <SearchBar 
            placeholder="Buscar ..."
            onSubmitEditing={onSearchPress}
          />
        </Box>
      </Box>
      
      {/* Centered LocationComponent */}
      <Box className="w-full flex items-center justify-center pt-2">
        <LocationComponent location={location} />
      </Box>
    </VStack>
  );
};

export default SearchLocationContainer;