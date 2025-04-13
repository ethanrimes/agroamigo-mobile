// src/features/home/components/header/HomeHeader.tsx
import React from 'react';
import { VStack } from '../../../../components/ui/organization';
import { Box } from '../../../../components/ui/organization';
import ThinHeaderStrip from './ThinHeaderStrip';
import SearchLocationContainer from './SearchLocationContainer';
import { Heading } from '../../../../components/ui/typography';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

interface HomeHeaderProps {
  location: string;
  onSearchPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  location,
  onSearchPress,
}) => {
  const { theme } = useTheme();
  
  return (
    <Box
      className="w-full"
      style={{
        backgroundColor: theme.colors.primary.default,
        ...theme.componentShadows.header,
      }}
    >
      <ThinHeaderStrip />
      <VStack
        className="w-full"
        space="md"
        style={{
          paddingHorizontal: theme.spacing.screenSpacing.screenMarginHorizontal,
          paddingVertical: theme.spacing.spacing.md
        }}
      >
        <Heading
          variant="headline3"
          color={theme.colors.neutral.white}
          align="center"
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