// src/features/selection/components/header/ThinHeaderStrip.tsx
import React from 'react';
import HStack from '@/src/components/ui/organization/HStack';
import Box from '@/src/components/ui/organization/Box';
import { Logo } from '@/src/components/ui/icons';
import FilterButton from './FilterButton';

interface ThinHeaderStripProps {
  onFilterPress?: () => void;
}

const ThinHeaderStrip: React.FC<ThinHeaderStripProps> = ({ onFilterPress }) => {
  return (
    <Box className="w-full bg-green-shade6 px-4 py-2">
      <HStack className="w-full justify-between items-center">
        <FilterButton onPress={onFilterPress} />
        <Logo size="small" />
      </HStack>
    </Box>
  );
};

export default ThinHeaderStrip;