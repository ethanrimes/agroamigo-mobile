// src/features/shared/slidingSideDrawer/components/SideDrawerContentSpace.tsx
import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import VStack from '@/src/components/ui/layout/VStack';
import HStack from '@/src/components/ui/layout/HStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterCategory, FilterOption } from '../SlidingSideDrawer';
import FilterElement from './FilterElement';

interface SideDrawerContentSpaceProps {
  filterCategories: FilterCategory[];
  loading: boolean;
  appliedFiltersCount: number;
  onClearAllFilters: () => void;
  onToggleFilter: (category: string, optionId: string) => void;
  selectedFilters: Record<string, string[]>;
  children?: React.ReactNode;
}

/**
 * Content space for the filter side drawer that displays filters
 */
const SideDrawerContentSpace: React.FC<SideDrawerContentSpaceProps> = ({
  filterCategories,
  loading,
  appliedFiltersCount,
  onClearAllFilters,
  onToggleFilter,
  selectedFilters,
  children,
}) => {
  const { colors } = useTheme();
  
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary.default} />
          <Text style={styles.loadingText}>Loading filters...</Text>
        </View>
      ) : (
        <VStack style={styles.filterContainer}>
          {/* Render filter categories dynamically */}
          {filterCategories.map((category, index) => (
            <FilterElement
              key={category.id}
              title={category.title}
              options={category.options}
              category={category.id}
              selectedOptions={selectedFilters[category.id] || []}
              onToggleOption={(optionId) => onToggleFilter(category.id, optionId)}
              showMoreIndicator={category.showMoreIndicator}
              defaultExpanded={category.defaultExpanded}
              // Don't show divider on the last element if no children
              showDivider={!(index === filterCategories.length - 1 && !children)}
            />
          ))}
          
          {/* Allow passing additional filter elements */}
          {children}
          
          {/* Applied filters count and reset button */}
          {filterCategories.length > 0 && (
            <View style={styles.footerContainer}>
              <HStack style={styles.footerContent}>
                {appliedFiltersCount > 0 ? (
                  <Text style={styles.filtersAppliedText}>
                    {appliedFiltersCount} filter{appliedFiltersCount !== 1 ? 's' : ''} applied
                  </Text>
                ) : (
                  <Text style={styles.filtersAppliedText}>No filters applied</Text>
                )}
                
                <Pressable onPress={onClearAllFilters}>
                  <Text style={styles.resetText}>
                    Reset all
                  </Text>
                </Pressable>
              </HStack>
              
              {/* Add button to apply filters */}
              <Pressable style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Agregar</Text>
              </Pressable>
            </View>
          )}
        </VStack>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 8,
    color: '#757575',
    fontSize: 14,
  },
  filterContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  footerContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersAppliedText: {
    fontSize: 14,
    color: '#757575',
  },
  resetText: {
    fontSize: 14,
    color: '#0077cc',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
});

export default SideDrawerContentSpace;