// src/features/shared/slidingSideDrawer/hooks/useSlidingDrawer.ts
import { useState, useCallback, useMemo } from 'react';

interface UseSlidingDrawerOptions {
  initialFilters?: Record<string, string[]>;
  onFiltersChange?: (filters: Record<string, string[]>) => void;
}

export interface UseSlidingDrawerResult {
  isVisible: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  filters: Record<string, string[]>;
  toggleFilter: (category: string, value: string) => void;
  clearAllFilters: () => void;
  appliedFiltersCount: number;
}

/**
 * Custom hook to manage sliding drawer state and filter operations
 */
export const useSlidingDrawer = (options: UseSlidingDrawerOptions = {}): UseSlidingDrawerResult => {
  const { initialFilters = {}, onFiltersChange } = options;
  
  // Visibility state
  const [isVisible, setIsVisible] = useState(false);
  
  // Filters state
  const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters);
  
  // Open drawer
  const openDrawer = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  // Close drawer
  const closeDrawer = useCallback(() => {
    setIsVisible(false);
  }, []);
  
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
    filters,
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount
  };
};

export default useSlidingDrawer;