// src/features/detail/hooks/common/usePriceQuantityToggle.ts
import { useState, useCallback, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';

interface UsePriceQuantityToggleReturn {
  isPriceView: boolean;
  setIsPriceView: (isPriceView: boolean) => void;
  toggleView: () => void;
}

/**
 * Custom hook to manage the state of the price/quantity toggle
 * @param initialState Initial state for the toggle (default: true for price view)
 * @returns Object with current state and functions to update it
 */
export const usePriceQuantityToggle = (
  initialState: boolean = true
): UsePriceQuantityToggleReturn => {
  const { view } = useLocalSearchParams<{ view?: string }>();
  const [isPriceView, setIsPriceView] = useState<boolean>(view === 'price' ? true : view === 'quantity' ? false : initialState);
  
  // Update the state if the URL parameter changes
  useEffect(() => {
    if (view === 'price') {
      setIsPriceView(true);
    } else if (view === 'quantity') {
      setIsPriceView(false);
    }
  }, [view]);
  
  // Function to toggle between price and quantity views
  const toggleView = useCallback(() => {
    setIsPriceView((prevState) => !prevState);
  }, []);
  
  return {
    isPriceView,
    setIsPriceView,
    toggleView,
  };
};

export default usePriceQuantityToggle;