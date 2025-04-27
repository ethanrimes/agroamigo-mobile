// src/features/detail/hooks/common/useDetailNavigation.ts
import { useCallback } from 'react';
import { useNavigationService } from '@/src/services/navigation';

interface UseDetailNavigationReturn {
  navigateToProductPrice: (productId: string) => void;
  navigateToProductQuantity: (productId: string) => void;
  navigateToMarketPrice: (marketId: string) => void;
  navigateToMarketQuantity: (marketId: string) => void;
  goBack: () => void;
}

/**
 * Custom hook for navigation between detail screens
 * @returns Object with navigation functions
 */
export const useDetailNavigation = (): UseDetailNavigationReturn => {
  const { navigateTo, navigateBack } = useNavigationService();
  
  const navigateToProductPrice = useCallback((productId: string) => {
    navigateTo(`/tabs/productos/detail/${productId}`, { view: 'price' });
  }, [navigateTo]);
  
  const navigateToProductQuantity = useCallback((productId: string) => {
    navigateTo(`/tabs/productos/detail/${productId}`, { view: 'quantity' });
  }, [navigateTo]);
  
  const navigateToMarketPrice = useCallback((marketId: string) => {
    navigateTo(`/tabs/mercados/detail/${marketId}`, { view: 'price' });
  }, [navigateTo]);
  
  const navigateToMarketQuantity = useCallback((marketId: string) => {
    navigateTo(`/tabs/mercados/detail/${marketId}`, { view: 'quantity' });
  }, [navigateTo]);
  
  return {
    navigateToProductPrice,
    navigateToProductQuantity,
    navigateToMarketPrice,
    navigateToMarketQuantity,
    goBack: navigateBack,
  };
};

export default useDetailNavigation;