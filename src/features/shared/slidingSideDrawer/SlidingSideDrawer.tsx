// src/features/shared/slidingSideDrawer/SlidingSideDrawer.tsx
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SideDrawerHeader from './components/SideDrawerHeader';
import SideDrawerContentSpace from './components/SideDrawerContentSpace';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
  showMoreIndicator?: boolean;
  defaultExpanded?: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface SlidingSideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  filterCategories?: FilterCategory[];
  loading?: boolean;
  appliedFiltersCount?: number;
  onClearAllFilters?: () => void;
  onToggleFilter?: (category: string, optionId: string) => void;
  selectedFilters?: Record<string, string[]>;
  children?: React.ReactNode;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85; // Make the drawer wider

/**
 * Reusable sliding side drawer component that slides in from the left
 */
const SlidingSideDrawer: React.FC<SlidingSideDrawerProps> = ({
  isVisible,
  onClose,
  title = "Filters",
  filterCategories = [],
  loading = false,
  appliedFiltersCount = 0,
  onClearAllFilters = () => {},
  onToggleFilter = () => {},
  selectedFilters = {},
  children,
}) => {
  const { colors, shadows } = useTheme();
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, translateX, backdropOpacity]);

  // Don't render anything if the drawer should be fully hidden
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents={isVisible ? 'auto' : 'none'}>
      {/* Semi-transparent backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: colors.neutral.black,
              opacity: backdropOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Sliding drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: DRAWER_WIDTH,
            backgroundColor: colors.background.light,
            transform: [{ translateX }],
            ...shadows.componentShadows.modal,
          },
        ]}
      >
        <SideDrawerHeader title={title} onBackPress={onClose} />
        <SideDrawerContentSpace 
          filterCategories={filterCategories} 
          loading={loading}
          appliedFiltersCount={appliedFiltersCount}
          onClearAllFilters={onClearAllFilters}
          onToggleFilter={onToggleFilter}
          selectedFilters={selectedFilters}
        >
          {children}
        </SideDrawerContentSpace>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});

export default SlidingSideDrawer;