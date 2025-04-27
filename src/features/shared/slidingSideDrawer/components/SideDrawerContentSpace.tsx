// src/features/shared/slidingSideDrawer/components/SideDrawerContentSpace.tsx
import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, Pressable } from 'react-native';
import VStack from '@/src/components/ui/layout/VStack';
import HStack from '@/src/components/ui/layout/HStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterCategory, FilterOption } from '../SlidingSideDrawer';
import FilterElement from './FilterElement';

interface SideDrawerContentSpaceProps {
  filterCategories: FilterCategory[];
  loading: boolean;
  appliedFiltersCount: number;
  onClearAllFilters: () => void;
  onToggleFilter: (category: string, optionId: string) => void;
  selectedFilters: Record<string, string[]>;
  children?: React.ReactNode;
}

/**
 * Content space for the filter side drawer that displays filters
 */
const SideDrawerContentSpace: React.FC<SideDrawerContentSpaceProps> = ({
  filterCategories,
  loading,
  appliedFiltersCount,
  onClearAllFilters,
  onToggleFilter,
  selectedFilters,
  children,
}) => {
  const { colors } = useTheme();
  
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <View className="items-center justify-center py-8">
          <ActivityIndicator size="small" color={colors.primary.default} />
          <Text className="mt-2 text-neutral-grey text-body-3">Loading filters...</Text>
        </View>
      ) : (
        <VStack className="space-y-4">
          {/* Render filter categories dynamically */}
          {filterCategories.map((category, index) => (
            <FilterElement
              key={category.id}
              title={category.title}
              options={category.options}
              category={category.id}
              selectedOptions={selectedFilters[category.id] || []}
              onToggleOption={(optionId) => onToggleFilter(category.id, optionId)}
              showMoreIndicator={category.showMoreIndicator}
              defaultExpanded={category.defaultExpanded}
              // Don't show divider on the last element if no children
              showDivider={!(index === filterCategories.length - 1 && !children)}
            />
          ))}
          
          {/* Allow passing additional filter elements */}
          {children}
          
          {/* Applied filters count and reset button */}
          {filterCategories.length > 0 && (
            <HStack className="pt-4 justify-between items-center">
              {appliedFiltersCount > 0 ? (
                <Text className="text-body-3 text-neutral-grey">
                  {appliedFiltersCount} filter{appliedFiltersCount !== 1 ? 's' : ''} applied
                </Text>
              ) : (
                <Text className="text-body-3 text-neutral-grey">No filters applied</Text>
              )}
              
              <Pressable onPress={onClearAllFilters}>
                <Text className="text-info-default text-body-3-medium">
                  Reset all
                </Text>
              </Pressable>
            </HStack>
          )}
        </VStack>
      )}
    </ScrollView>
  );
};

export default SideDrawerContentSpace;