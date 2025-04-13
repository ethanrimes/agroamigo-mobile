import { useCallback } from 'react';
import { useRouter } from 'expo-router';

interface HomeActions {
  handlePricePress: (id: string) => void;
  handleSearchPress: () => void;
}

export const useHomeActions = (): HomeActions => {
  const router = useRouter();
  
  const handlePricePress = useCallback((id: string) => {
    // Use type assertion to bypass TypeScript checks
    router.push({
      pathname: '/(tabs)/(productos)/(detail)/[producto]',
      params: { producto: id }
    } as any);
  }, [router]);
  
  const handleSearchPress = useCallback(() => {
    // Use type assertion to bypass TypeScript checks
    router.push('/(tabs)/(productos)/products' as any);
  }, [router]);
  
  return {
    handlePricePress,
    handleSearchPress,
  };
};

export default useHomeActions;