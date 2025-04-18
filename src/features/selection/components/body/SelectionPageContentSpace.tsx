// src/features/selection/components/body/SelectionPageContentSpace.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import SelectionPageCategory from './SelectionPageCategory';

export interface SelectionItem {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
}

export interface SubCategory {
  id: string;
  title: string;
  items: SelectionItem[];
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  subCategories: SubCategory[];
}

interface SelectionPageContentSpaceProps {
  categories: Category[];
  onItemPress?: (item: SelectionItem) => void;
}

const SelectionPageContentSpace: React.FC<SelectionPageContentSpaceProps> = ({
  categories,
  onItemPress,
}) => {
  return (
    <ScrollView>
      <VStack className="w-full">
        {categories.map((category) => (
          <SelectionPageCategory
            key={category.id}
            category={category}
            onItemPress={onItemPress}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default SelectionPageContentSpace;