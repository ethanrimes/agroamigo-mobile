import React from 'react';
import { Text } from 'react-native';
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
        className="w-full p-6 space-y-8"
      >
        {/* Make sure Heading properly wraps text */}
        <Box className="items-center justify-center pt-6 pb-2">
          <Heading
            size="2xl"
            className="text-white text-center"
          >
            Bienvenido
          </Heading>
        </Box>
        
        <Box className="pt-4">
          <SearchLocationContainer
            location={location}
            onSearchPress={onSearchPress}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default HomeHeader;