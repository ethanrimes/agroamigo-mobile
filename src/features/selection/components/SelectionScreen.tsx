// src/features/selection/components/SelectionScreen.tsx
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelectionFilters } from '../hooks/useSelectionFilters';
import SelectionHeader from './header/SelectionHeader';
import SelectionPageContentSpace from './body/SelectionPageContentSpace';
import SlidingSideDrawer, { FilterCategory } from '@/src/features/shared/slidingSideDrawer/SlidingSideDrawer';

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

interface SelectionScreenProps {
  type: 'products' | 'markets' | 'insumos';
  title: string;
  location: string;
  data: any[];
  loading: boolean;
  error: string | null;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({
  type,
  title,
  location,
  data,
  loading,
  error,
}) => {
  // Use the simplified selection filters hook
  const { 
    isFilterPaneVisible, 
    closeFilters, 
    openFilters,
    filters, 
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount
  } = useSelectionFilters();
  
  // Get filter categories for this screen type
  const filterCategories = useMemo(() => {
    return FILTER_CONFIGS[type] || [];
  }, [type]);
  
  // Handle filter button press in header
  const handleFilterPress = () => {
    openFilters();
  };
  
  return (
    <View className="flex-1">
      <SelectionHeader
        title={title}
        location={location}
        onFilterPress={handleFilterPress}
      />
      
      {/* Pass the content data to the page content space */}
      <SelectionPageContentSpace 
        type={type}
        items={data}
        isLoading={loading}
        errorMessage={error}
      />
      
      {/* Sliding side drawer using our updated component */}
      <SlidingSideDrawer
        isVisible={isFilterPaneVisible}
        onClose={closeFilters}
        title="Filters"
        filterCategories={filterCategories}
        loading={false}
        appliedFiltersCount={appliedFiltersCount}
        onClearAllFilters={clearAllFilters}
        onToggleFilter={toggleFilter}
        selectedFilters={filters}
      />
    </View>
  );
};

export default SelectionScreen;