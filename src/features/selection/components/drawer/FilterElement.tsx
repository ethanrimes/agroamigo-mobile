import React from 'react';
import { FilterElement as BaseFilterElement, FilterOption } from '@/src/components/ui/filter';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';

interface FilterElementProps {
  title: string;
  options: FilterOption[];
  category: string;
  showMoreIndicator?: boolean;
  defaultExpanded?: boolean;
  showDivider?: boolean;
}

/**
 * Selection-specific implementation of the FilterElement that connects to the selection filters state
 */
const FilterElement: React.FC<FilterElementProps> = ({
  title,
  options,
  category,
  showMoreIndicator = true,
  defaultExpanded = true,
  showDivider = true,
}) => {
  const { filters, toggleFilter } = useSelectionFilters();
  
  // Get the currently selected options for this category
  const selectedOptions = filters[category] || [];
  
  // Handle the toggle action
  const handleToggleOption = (optionId: string) => {
    toggleFilter(category, optionId);
  };
  
  return (
    <BaseFilterElement
      title={title}
      options={options}
      selectedOptions={selectedOptions}
      onToggleOption={handleToggleOption}
      showMoreIndicator={showMoreIndicator}
      defaultExpanded={defaultExpanded}
      showDivider={showDivider}
    />
  );
};

export default FilterElement;