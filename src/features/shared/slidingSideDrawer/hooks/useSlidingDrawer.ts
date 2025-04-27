// src/features/shared/slidingSideDrawer/hooks/useSlidingDrawer.ts
import { useState, useCallback, useMemo } from 'react';

export interface SlidingDrawerConfig {
  initialFilters?: Record<string, string[]>;
  initialVisibility?: boolean;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  onVisibilityChange?: (isVisible: boolean) => void;
}

export interface SlidingDrawerResult {
  isVisible: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  filters: Record<string, string[]>;
  toggleFilter: (category: string, value: string) => void;
  clearAllFilters: () => void;
  appliedFiltersCount: number;
  getFilterState: (category: string, value: string) => boolean;
}

/**
 * Custom hook to manage sliding drawer state and filter operations
 */
export const useSlidingDrawer = (config: SlidingDrawerConfig = {}): SlidingDrawerResult => {
  const { 
    initialFilters = {}, 
    initialVisibility = false,
    onFiltersChange,
    onVisibilityChange
  } = config;
  
  // Visibility state
  const [isVisible, setIsVisible] = useState(initialVisibility);
  
  // Filters state
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);
  
  // Open drawer
  const openDrawer = useCallback(() => {
    setIsVisible(true);
    if (onVisibilityChange) {
      onVisibilityChange(true);
    }
  }, [onVisibilityChange]);
  
  // Close drawer
  const closeDrawer = useCallback(() => {
    setIsVisible(false);
    if (onVisibilityChange) {
      onVisibilityChange(false);
    }
  }, [onVisibilityChange]);
  
  // Toggle drawer visibility
  const toggleDrawer = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    if (onVisibilityChange) {
      onVisibilityChange(newVisibility);
    }
  }, [isVisible, onVisibilityChange]);
  
  // Toggle filter value
  const toggleFilter = useCallback((category: string, value: string) => {
    setFilters(prevFilters => {
      const currentCategoryFilters = prevFilters[category] || [];
      
      let newCategoryFilters: string[];
      
      // If the value is already selected, remove it
      if (currentCategoryFilters.includes(value)) {
        newCategoryFilters = currentCategoryFilters.filter(v => v !== value);
      } else {
        // Otherwise, add it
        newCategoryFilters = [...currentCategoryFilters, value];
      }
      
      const updatedFilters = {
        ...prevFilters,
        [category]: newCategoryFilters
      };
      
      // Call the optional callback
      if (onFiltersChange) {
        onFiltersChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  }, [onFiltersChange]);
  
  // Get filter state (selected or not)
  const getFilterState = useCallback((category: string, value: string): boolean => {
    const categoryFilters = filters[category] || [];
    return categoryFilters.includes(value);
  }, [filters]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
    
    // Call the optional callback
    if (onFiltersChange) {
      onFiltersChange({});
    }
  }, [onFiltersChange]);
  
  // Calculate applied filters count
  const appliedFiltersCount = useMemo(() => {
    return Object.values(filters).reduce((count, selectedOptions) => {
      return count + selectedOptions.length;
    }, 0);
  }, [filters]);
  
  return {
    isVisible,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    filters,
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount,
    getFilterState
  };
};

export default useSlidingDrawer;