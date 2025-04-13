// src/features/home/components/body/NewsBullet.tsx
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Typography } from '../../../../components/ui/typography';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

interface NewsBulletProps {
  text: string;
}

const NewsBullet: React.FC<NewsBulletProps> = ({
  text,
}) => {
  const { theme } = useTheme();
  
  return (
    <HStack space="md" className="items-center w-full">
      <Box
        className={`h-8 w-8 rounded-full`}
        style={{ backgroundColor: theme.colors.text.primary }}
      />
      <Typography
        variant="body2"
        color={theme.colors.text.primary}
      >
        {text}
      </Typography>
    </HStack>
  );
};

export default NewsBullet;