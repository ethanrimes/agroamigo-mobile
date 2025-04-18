// src/features/home/components/header/ThinHeaderStrip.tsx
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Logo } from '../../../../components/ui/icons';

const ThinHeaderStrip: React.FC = () => {
  return (
    <Box
      className="w-full bg-secondary-500 px-4 py-xs"
    >
      <HStack className="w-full justify-end">
        <Logo size="small" />
      </HStack>
    </Box>
  );
};

export default ThinHeaderStrip;