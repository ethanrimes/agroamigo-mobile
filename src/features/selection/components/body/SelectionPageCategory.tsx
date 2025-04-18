// src/features/selection/components/body/SelectionPageCategory.tsx
import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import CategoryHeader from './CategoryHeader';
import SubCategoryHeader from './SubCategoryHeader';
import SelectionListItem from './SelectionListItem';
import CategoryIcon, { CategoryIconName } from '@/src/components/ui/icons/CategoryIcon';
interface SubCategory {
  id: string;
  title: string;
  items: SelectionItem[];
}

interface SelectionItem {
  id: string;
  title: string;
  subtitle?: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
}

interface SelectionPageCategoryProps {
  category: {
    id: string;
    title: string;
    icon: string;
    subCategories: SubCategory[];
  };
  onItemPress?: (item: SelectionItem) => void;
}

const SelectionPageCategory: React.FC<SelectionPageCategoryProps> = ({
  category,
  onItemPress,
}) => {
  const renderItem = ({ item, index }: ListRenderItemInfo<any>) => {
    // If the item is a subcategory header
    if (item.type === 'header') {
      return <SubCategoryHeader title={item.title} />;
    }
    
    // If the item is a selection list item
    return (
      <SelectionListItem
        title={item.title}
        subtitle={item.subtitle}
        price={item.price}
        trend={item.trend}
        onPress={() => onItemPress && onItemPress(item)}
      />
    );
  };

  // Flatten the data structure for the FlatList
  const flattenedData = React.useMemo(() => {
    const data: any[] = [];
    
    category.subCategories.forEach(subCategory => {
      // Add subcategory header
      data.push({
        id: `header-${subCategory.id}`,
        type: 'header',
        title: subCategory.title,
      });
      
      // Add items from the subcategory
      subCategory.items.forEach(item => {
        data.push({
          ...item,
          type: 'item',
        });
      });
    });
    
    return data;
  }, [category]);

  return (
    <VStack className="w-full mb-4">
      <CategoryHeader 
        title={category.title} 
        icon={category.icon as CategoryIconName} 
      />
      
      <FlatList
        data={flattenedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </VStack>
  );
};

export default SelectionPageCategory;