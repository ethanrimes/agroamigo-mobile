import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import FilterElement from '@/src/features/selection/components/drawer/FilterElement';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';
import VStack from '@/src/components/ui/organization/VStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Filter types
interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

interface SideDrawerContentSpaceProps {
  screenType: 'products' | 'markets' | 'insumos';
  children?: React.ReactNode;
}

const SideDrawerContentSpace: React.FC<SideDrawerContentSpaceProps> = ({
  screenType,
  children,
}) => {
  const { colors } = useTheme();
  const { clearAllFilters } = useSelectionFilters();
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch appropriate filters based on screen type
  useEffect(() => {
    // In a real app, this would be an API call or data fetched from a store
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filters: FilterCategory[] = [];
      
      // Different filter categories based on screen type
      if (screenType === 'products') {
        filters = [
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
        ];
      } else if (screenType === 'markets') {
        filters = [
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
          },
          {
            id: 'activity_level',
            title: 'Activity level',
            options: [
              { id: 'high', label: 'High' },
              { id: 'medium', label: 'Medium' },
              { id: 'low', label: 'Low' }
            ]
          }
        ];
      } else if (screenType === 'insumos') {
        filters = [
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
        ];
      }
      
      setFilterCategories(filters);
      setLoading(false);
    }, 300); // Simulated loading time
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
          {filterCategories.map((category) => (
            <FilterElement
              key={category.id}
              title={category.title}
              options={category.options}
              category={category.id}
            />
          ))}
          
          {/* Allow passing additional filter elements */}
          {children}
          
          {/* Reset filters button */}
          {filterCategories.length > 0 && (
            <View className="pt-4">
              <Text 
                className="text-info-default text-body-3-medium text-center"
                onPress={clearAllFilters}
              >
                Reset all filters
              </Text>
            </View>
          )}
        </VStack>
      )}
    </ScrollView>
  );
};

export default SideDrawerContentSpace;