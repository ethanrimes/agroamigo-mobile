// src/features/home/components/header/HomeHeader.tsx
import React from 'react';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import ThinHeaderStrip from './ThinHeaderStrip';
import SearchLocationContainer from './SearchLocationContainer';

interface HomeHeaderProps {
  location: string;
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  location,
  onSearchPress,
}) => {
  return (
    <Box
      className="w-full bg-green-shade5 shadow-lg"
    >
      <ThinHeaderStrip />
      <VStack
        className="w-full p-4 space-y-md"
      >
        <Heading
          size="2xl"
          className="text-white text-center"
        >
          Bienvenido
        </Heading>
        <SearchLocationContainer
          location={location}
          onSearchPress={onSearchPress}
        />
      </VStack>
    </Box>
  );
};

export default HomeHeader;