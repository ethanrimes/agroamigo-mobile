import { useState, useCallback } from 'react';
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

  return {
    isFilterPaneVisible,
    openFilters,
    closeFilters,
    filters,
    toggleFilter,
    clearAllFilters
  };
};

export default useSelectionFilters;