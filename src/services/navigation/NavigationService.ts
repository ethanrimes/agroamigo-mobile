import { useCallback } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useNavigationContext } from '../../components/navigation/Navigator';

/**
 * NavigationService provides methods for navigating between screens
 * and tracking navigation history throughout the app
 */
export const useNavigationService = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    navigationHistory, 
    addToHistory, 
    removeLastFromHistory, 
    getPreviousRoute 
  } = useNavigationContext();

  // Navigate to a specific route and add it to history
  const navigateTo = useCallback(
    (route: string, params?: Record<string, string>) => {
      addToHistory(pathname);
      router.push({
        pathname: route as any,
        params,
      });
    },
    [router, pathname, addToHistory]
  );

  // Go back to the previous screen in history
  const navigateBack = useCallback(() => {
    const previousRoute = getPreviousRoute();
    
    if (previousRoute) {
      removeLastFromHistory();
      router.back();
      return true;
    }
    
    // Fallback to home if no previous route
    router.push('/');
    return false;
  }, [getPreviousRoute, removeLastFromHistory, router]);

  // Replace current screen with another route
  const replaceCurrent = useCallback(
    (route: string, params?: Record<string, string>) => {
      router.replace({
        pathname: route as any,
        params,
      });
    },
    [router]
  );

  return {
    navigateTo,
    navigateBack,
    replaceCurrent,
    currentPath: pathname,
    navigationHistory,
  };
};

export default useNavigationService;