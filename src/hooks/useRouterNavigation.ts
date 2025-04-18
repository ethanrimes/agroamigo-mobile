import { useRouter, useNavigation, usePathname } from 'expo-router';
import { useCallback } from 'react';

/**
 * Custom hook for navigation functionality
 * Provides methods for navigating between screens and tracking navigation history
 */
export const useRouterNavigation = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();

  // Navigate to a specific route
  const navigate = useCallback(
    (route: string, params?: Record<string, string>) => {
      router.push({
        pathname: route as any,
        params,
      });
    },
    [router]
  );

  // Navigate to the previous screen in history
  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback to home if can't go back
      router.push('/');
    }
  }, [navigation, router]);

  // Replace current screen with a new route
  const replace = useCallback(
    (route: string, params?: Record<string, string>) => {
      router.replace({
        pathname: route as any,
        params,
      });
    },
    [router]
  );

  // Reset navigation and go to a specific route
  const reset = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  return {
    navigate,
    goBack,
    replace,
    reset,
    currentPath: pathname,
    canGoBack: navigation.canGoBack(),
  };
};

export default useRouterNavigation;