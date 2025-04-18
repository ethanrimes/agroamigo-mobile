import { create } from 'zustand';

// Define the filter store state type
interface FilterState {
  isFilterPaneVisible: boolean;
  filters: Record<string, string[]>;
  setFilterPaneVisible: (isVisible: boolean) => void;
  updateFilter: (category: string, value: string) => void;
  resetFilters: () => void;
}

// Create the filter store with initial state and actions
export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  isFilterPaneVisible: false,
  filters: {},

  // Actions
  setFilterPaneVisible: (isVisible) => set({ isFilterPaneVisible: isVisible }),
  
  updateFilter: (category, value) => set((state) => {
    // Get current filters for this category
    const currentFilters = state.filters[category] || [];
    
    // If value already exists, remove it (toggle off)
    // Otherwise add it (toggle on)
    const updatedFilters = currentFilters.includes(value)
      ? currentFilters.filter(v => v !== value)
      : [...currentFilters, value];
    
    return {
      filters: {
        ...state.filters,
        [category]: updatedFilters
      }
    };
  }),
  
  resetFilters: () => set({ filters: {} }),
}));

export default useFilterStore;