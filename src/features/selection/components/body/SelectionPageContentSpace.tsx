// src/features/selection/components/body/SelectionPageContentSpace.tsx
import React, { useMemo } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
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
  type?: 'products' | 'markets' | 'insumos';
  categories?: Category[];
  items?: any[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onItemPress?: (item: SelectionItem) => void;
}

const SelectionPageContentSpace: React.FC<SelectionPageContentSpaceProps> = ({
  type,
  categories,
  items,
  isLoading,
  errorMessage,
  onItemPress,
}) => {
  // Determine which data to use - prioritize categories if provided
  const displayCategories = useMemo(() => {
    if (categories) {
      return categories;
    }
    
    // If items are provided but not categories, use items
    if (items) {
      return items as Category[]; // Assuming items matches the Category structure
    }
    
    return [];
  }, [categories, items]);

  // Show loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show error message
  if (errorMessage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text>
      </View>
    );
  }

  // No data available
  if (displayCategories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ textAlign: 'center' }}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <VStack className="w-full">
        {displayCategories.map((category) => (
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