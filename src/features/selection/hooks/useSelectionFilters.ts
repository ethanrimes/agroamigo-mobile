// src/features/selection/hooks/useSelectionFilters.ts
import { useCallback, useMemo } from 'react';
import { useFilterStore } from '@/src/store/filterStore';
import { useSlidingDrawer } from '@/src/features/shared/slidingSideDrawer';

export const useSelectionFilters = () => {
  // Use Zustand store to maintain filter state across components
  const { 
    filters, 
    updateFilter, 
    resetFilters 
  } = useFilterStore();

  // Use the shared sliding drawer hook
  const {
    isVisible: isFilterPaneVisible,
    openDrawer: openFilters,
    closeDrawer: closeFilters,
    toggleFilter: handleToggleFilter,
    clearAllFilters: handleClearAllFilters,
    appliedFiltersCount
  } = useSlidingDrawer({
    initialFilters: filters,
    onFiltersChange: (newFilters) => {
      // Update each filter category when changed
      Object.entries(newFilters).forEach(([category, values]) => {
        // For each category, update with the current values
        values.forEach(value => {
          updateFilter(category, value);
        });
      });
    }
  });

  // Method to toggle a specific filter value
  const toggleFilter = useCallback((category: string, value: string) => {
    handleToggleFilter(category, value);
  }, [handleToggleFilter]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    handleClearAllFilters();
    resetFilters();
  }, [handleClearAllFilters, resetFilters]);

  return {
    isFilterPaneVisible,
    openFilters,
    closeFilters,
    filters,
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount
  };
};

export default useSelectionFilters;