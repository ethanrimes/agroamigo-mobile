// src/features/home/components/body/NewsBullet.tsx
import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

interface NewsBulletProps {
  text: string;
}

const NewsBullet: React.FC<NewsBulletProps> = ({
  text,
}) => {
  return (
    <HStack className="items-center w-full space-x-md">
      <Box
        className="h-8 w-8 rounded-full bg-typography-900"
      />
      <Text
        className="text-typography-900 text-sm"
      >
        {text}
      </Text>
    </HStack>
  );
};

export default NewsBullet;