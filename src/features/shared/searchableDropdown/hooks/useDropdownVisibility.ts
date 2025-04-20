// src/features/shared/searchableDropdown/hooks/useDropdownVisibility.ts
import { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

interface UseDropdownVisibilityResult {
  isVisible: boolean;
  dropdownHeight: Animated.Value;
  showDropdown: () => void;
  hideDropdown: () => void;
  toggleDropdown: () => void;
}

export const useDropdownVisibility = (): UseDropdownVisibilityResult => {
  // Track visibility state
  const [isVisible, setIsVisible] = useState(false);
  
  // Animated value for dropdown height
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  
  // Maximum height for the dropdown (can be adjusted)
  const MAX_HEIGHT = 350;
  
  // Function to show the dropdown with animation
  const showDropdown = useCallback(() => {
    // Set visible first for rendering
    setIsVisible(true);
    
    // Then animate height
    Animated.timing(dropdownHeight, {
      toValue: MAX_HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [dropdownHeight]);
  
  // Function to hide the dropdown with animation
  const hideDropdown = useCallback(() => {
    // Animate height to 0
    Animated.timing(dropdownHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      // After animation completes, set not visible
      setIsVisible(false);
    });
  }, [dropdownHeight]);
  
  // Function to toggle dropdown visibility
  const toggleDropdown = useCallback(() => {
    if (isVisible) {
      hideDropdown();
    } else {
      showDropdown();
    }
  }, [isVisible, hideDropdown, showDropdown]);
  
  return {
    isVisible,
    dropdownHeight,
    showDropdown,
    hideDropdown,
    toggleDropdown,
  };
};

export default useDropdownVisibility;