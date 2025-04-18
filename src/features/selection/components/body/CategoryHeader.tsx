// src/features/selection/components/body/CategoryHeader.tsx
import React from 'react';
import { Text, View } from 'react-native';
import HStack from '@/src/components/ui/organization/HStack';
import Box from '@/src/components/ui/organization/Box';
import CategoryIcon, { CategoryIconName } from '@/src/components/ui/icons/CategoryIcon';

interface CategoryHeaderProps {
  title: string;
  icon: CategoryIconName; // Updated to use the correct type
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, icon }) => {
  return (
    <Box className="w-full bg-neutral-darkGrey p-4">
      <HStack className="items-center space-x-3">
        <CategoryIcon name={icon} size={32} color="#FFFFFF" />
        <Text className="text-xl font-semibold text-white">{title}</Text>
      </HStack>
    </Box>
  );
};

export default CategoryHeader;