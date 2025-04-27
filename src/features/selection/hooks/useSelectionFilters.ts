// src/features/selection/hooks/useSelectionFilters.ts
import { useSlidingDrawer } from '@/src/features/shared/slidingSideDrawer/hooks/useSlidingDrawer';

/**
 * Simple hook to manage selection filters
 * Directly uses the sliding drawer hook with default settings
 */
export const useSelectionFilters = () => {
  const {
    isVisible: isFilterPaneVisible,
    openDrawer: openFilters,
    closeDrawer: closeFilters,
    toggleDrawer: toggleFilters,
    filters,
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount,
    getFilterState,
  } = useSlidingDrawer();

  return {
    isFilterPaneVisible,
    openFilters,
    closeFilters,
    toggleFilters,
    filters,
    toggleFilter,
    clearAllFilters,
    appliedFiltersCount,
    getFilterState,
  };
};

export default useSelectionFilters;