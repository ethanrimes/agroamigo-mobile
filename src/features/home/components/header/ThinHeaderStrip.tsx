// src/features/home/components/header/ThinHeaderStrip.tsx
import React from 'react';
import { HStack } from '../../../../components/ui/organization';
import { Box } from '../../../../components/ui/organization';
import { Logo } from '../../../../components/ui/icons';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

const ThinHeaderStrip: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <Box
      className="w-full"
      style={{
        paddingHorizontal: theme.spacing.screenSpacing.screenMarginHorizontal,
        backgroundColor: theme.colors.secondary.default,
        paddingVertical: theme.spacing.spacing.xs
      }}
    >
      <HStack className="w-full justify-end">
        <Logo size="small" />
      </HStack>
    </Box>
  );
};

export default ThinHeaderStrip;