import { useState, useCallback, useMemo } from 'react';
import { useFilterStore } from '@/src/store/filterStore';

export const useSelectionFilters = () => {
  // Use Zustand store to maintain filter state across components
  const { 
    isFilterPaneVisible, 
    setFilterPaneVisible, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useFilterStore();

  // Method to open the filter sidebar
  const openFilters = useCallback(() => {
    setFilterPaneVisible(true);
  }, [setFilterPaneVisible]);

  // Method to close the filter sidebar
  const closeFilters = useCallback(() => {
    setFilterPaneVisible(false);
  }, [setFilterPaneVisible]);

  // Method to toggle a specific filter value
  const toggleFilter = useCallback((category: string, value: string) => {
    updateFilter(category, value);
  }, [updateFilter]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  // Calculate the total number of applied filters
  const appliedFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count, selectedOptions) => {
      return count + selectedOptions.length;
    }, 0);
  }, [filters]);

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