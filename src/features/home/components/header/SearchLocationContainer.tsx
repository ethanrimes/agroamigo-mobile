// src/features/home/components/header/SearchLocationContainer.tsx
import React from 'react';
import { VStack } from '@/components/ui/vstack';
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
      className="w-full space-y-md"
    >
      <SearchBar 
        placeholder="Buscar ..."
        onSubmitEditing={onSearchPress}
      />
      <LocationComponent location={location} />
    </VStack>
  );
};

export default SearchLocationContainer;