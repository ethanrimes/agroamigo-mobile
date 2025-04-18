// src/features/home/components/header/SearchLocationContainer.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { SearchBar } from '../../../../components/ui/search';
import { LocationComponent } from '../../../../components/ui/data';

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
      className="w-full space-y-4" // Changed from space-y-lg to space-y-4 for specific spacing
    >
      {/* Narrower SearchBar */}
      <Box className="w-full flex items-center justify-center">
        <Box className="w-4/5"> {/* SearchBar takes 80% width */}
          <SearchBar 
            placeholder="Buscar ..."
            onSubmitEditing={onSearchPress}
          />
        </Box>
      </Box>
      
      {/* Centered LocationComponent */}
      <Box className="w-full flex items-center justify-center pt-2"> {/* Added pt-2 for extra spacing */}
        <LocationComponent location={location} />
      </Box>
    </VStack>
  );
};

export default SearchLocationContainer;