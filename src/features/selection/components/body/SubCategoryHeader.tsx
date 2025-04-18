// src/features/selection/components/body/SubCategoryHeader.tsx
import React from 'react';
import { Text } from 'react-native';
import { Box } from '@/components/ui/box';

interface SubCategoryHeaderProps {
  title: string;
}

const SubCategoryHeader: React.FC<SubCategoryHeaderProps> = ({ title }) => {
  return (
    <Box className="w-full bg-neutral-silver p-3">
      <Text className="text-lg font-medium text-neutral-black">{title}</Text>
    </Box>
  );
};

export default SubCategoryHeader;