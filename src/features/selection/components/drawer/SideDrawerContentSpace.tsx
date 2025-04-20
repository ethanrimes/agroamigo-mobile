import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, Pressable } from 'react-native';
import FilterElement from './FilterElement';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';
import VStack from '@/src/components/ui/layout/VStack';
import HStack from '@/src/components/ui/layout/HStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterOption } from '@/src/components/ui/filter';

// Filter category definition
export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
  showMoreIndicator?: boolean;
}

// Filter configuration for different screen types
const FILTER_CONFIGS: Record<string, FilterCategory[]> = {
  products: [
    {
      id: 'market_size',
      title: 'Market size',
      options: [
        { id: 'small', label: 'Small (< 1000 kg)' },
        { id: 'medium', label: 'Medium (1000 - 5000 kg)' },
        { id: 'large', label: 'Large (> 5000 kg)' }
      ]
    },
    {
      id: 'update_frequency',
      title: 'Update frequency',
      options: [
        { id: 'daily', label: 'Daily' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' }
      ]
    },
    {
      id: 'tracked_prices',
      title: 'Products w/ tracked prices',
      options: [
        { id: 'all', label: 'All products' },
        { id: 'tracked_only', label: 'Tracked only' }
      ]
    }
  ],
  markets: [
    {
      id: 'region',
      title: 'Region',
      options: [
        { id: 'antioquia', label: 'Antioquia' },
        { id: 'valle', label: 'Valle del Cauca' },
        { id: 'narino', label: 'Nariño' },
        { id: 'cauca', label: 'Cauca' }
      ]
    },
    {
      id: 'market_type',
      title: 'Market type',
      options: [
        { id: 'wholesale', label: 'Wholesale' },
        { id: 'retail', label: 'Retail' }
      ]
    },
    {
      id: 'size',
      title: 'Size',
      options: [
        { id: 'small', label: 'Small' },
        { id: 'medium', label: 'Medium' },
        { id: 'large', label: 'Large' }
      ]
    }
  ],
  insumos: [
    {
      id: 'category',
      title: 'Category',
      options: [
        { id: 'fertilizers', label: 'Fertilizers' },
        { id: 'pesticides', label: 'Pesticides' },
        { id: 'seeds', label: 'Seeds' },
        { id: 'tools', label: 'Tools & Equipment' }
      ]
    },
    {
      id: 'price_range',
      title: 'Price range',
      options: [
        { id: 'economy', label: 'Economy' },
        { id: 'standard', label: 'Standard' },
        { id: 'premium', label: 'Premium' }
      ]
    },
    {
      id: 'availability',
      title: 'Availability',
      options: [
        { id: 'in_stock', label: 'In stock' },
        { id: 'low_stock', label: 'Low stock' },
        { id: 'out_of_stock', label: 'Out of stock' }
      ]
    }
  ]
};

interface SideDrawerContentSpaceProps {
  screenType: 'products' | 'markets' | 'insumos';
  children?: React.ReactNode;
}

/**
 * Content space for the filter side drawer that displays filters based on screen type
 */
const SideDrawerContentSpace: React.FC<SideDrawerContentSpaceProps> = ({
  screenType,
  children,
}) => {
  const { colors } = useTheme();
  const { clearAllFilters, appliedFiltersCount } = useSelectionFilters();
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch appropriate filters based on screen type
  useEffect(() => {
    setLoading(true);
    
    // In a real app, this might be an API call
    // Here we're using our predefined filter configurations
    setTimeout(() => {
      setFilterCategories(FILTER_CONFIGS[screenType] || []);
      setLoading(false);
    }, 300); // Simulate network delay
  }, [screenType]);
  
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
              showMoreIndicator={category.showMoreIndicator}
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
              
              <Pressable onPress={clearAllFilters}>
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