// src/features/home/hooks/useHomeActions.ts
import { useState, useCallback, useEffect } from 'react';
import { savedProductsManager, SavedProduct } from '@/src/services/cache/entities/savedProductsManager';
import { getProductById } from '@/src/services/supabase/entities/producto';
import { useRouter } from 'expo-router';
import { useLocationStore } from '@/src/store/locationStore';
import { getDailyPriceObservationsByMarket } from '@/src/services/supabase/entities/precio';

// Define the types
export interface SavedPriceItem {
  artiId: number;
  UnitsId: number;
  PresentationId: number;
  UnitsPresentationId: number;
  icon: string;
}

export interface FeaturedPriceItem {
  artiId: number;
  UnitsId: number;
  PresentationId: number;
  UnitsPresentationId: number;
  icon: string;
}

export const useHomeActions = () => {
  const [savedPrices, setSavedPrices] = useState<SavedPriceItem[]>([]);
  const [featuredPriceItem, setFeaturedPriceItem] = useState<FeaturedPriceItem>({
    artiId: 1, 
    UnitsId: 1, 
    PresentationId: 1,
    UnitsPresentationId: 1,
    icon: "apple"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { currentLocationId } = useLocationStore();
  
  // Function to fetch saved products
  useEffect(() => {
    const fetchSavedProducts = async () => {
      try {
        setIsLoading(true);
        // Get saved products from the savedProductsManager
        const products = await savedProductsManager.getSavedProducts();
        
        // For each saved product, fetch the product details to get the icon
        const enrichedProducts = await Promise.all(
          products.map(async (product): Promise<SavedPriceItem> => {
            try {
              const productDetails = await getProductById(product.artiId);
              return {
                artiId: product.artiId,
                UnitsId: 1, // Default value, will be fetched from UnitsPresentationId
                PresentationId: 1, // Default value, will be fetched from UnitsPresentationId
                UnitsPresentationId: product.UnitsPresentationId,
                icon: productDetails.Icon || 'package', // Default to 'package' if no icon
              };
            } catch (err) {
              console.error(`Error fetching product details for artiId: ${product.artiId}`, err);
              // Return a default object if product details fetch fails
              return {
                artiId: product.artiId,
                UnitsId: 1,
                PresentationId: 1,
                UnitsPresentationId: product.UnitsPresentationId,
                icon: 'package', // Default icon
              };
            }
          })
        );
        
        setSavedPrices(enrichedProducts);
      } catch (err) {
        setError('Error fetching saved products');
        console.error('Error fetching saved products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedProducts();
  }, []);
  
  // Function to fetch a featured price item based on current location
  useEffect(() => {
    const fetchFeaturedPriceItem = async () => {
      try {
        setIsLoading(true);
        
        // Get price observations for the current market
        const marketObservations = await getDailyPriceObservationsByMarket(currentLocationId);
        
        // If there are no observations for this market, keep the default
        if (!marketObservations || marketObservations.length === 0) {
          console.log(`No price observations for market ID: ${currentLocationId}`);
          return;
        }
        
        // Get the most recent observations
        const recentObservations = marketObservations
          .sort((a, b) => {
            if (!a.date || !b.date) return 0;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .slice(0, 10); // Take the 10 most recent observations
        
        // Pick a random observation from the recent ones
        const randomIndex = Math.floor(Math.random() * recentObservations.length);
        const selectedObservation = recentObservations[randomIndex];
        
        if (selectedObservation) {
          // Fetch the product details to get the icon
          const productDetails = await getProductById(selectedObservation.artiId);
          
          setFeaturedPriceItem({
            artiId: selectedObservation.artiId,
            UnitsId: selectedObservation.unitsId || 1,
            PresentationId: selectedObservation.presentationId || 1,
            UnitsPresentationId: selectedObservation.UnitsPresentationId || 1,
            icon: productDetails.Icon || 'package', // Default to 'package' if no icon
          });
        }
      } catch (err) {
        console.error('Error fetching featured price item:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only fetch featured price item if we have a valid market ID
    if (currentLocationId > 0) {
      fetchFeaturedPriceItem();
    }
  }, [currentLocationId]);
  
  // Function to get a random featured price item
  const getRandomFeaturedPriceItem = useCallback(<T extends {artiId: number}>(items: T[] | null): T | null => {
    if (!items || items.length === 0) return null;
    
    // If there's only one item, return it
    if (items.length === 1) return items[0];
    
    // Otherwise, select a random item
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }, []);
  
  // Function to navigate to product detail
  const navigateToProductDetail = useCallback((artiId: number) => {
    router.push(`/productos/detail/${artiId}`);
  }, [router]);
  
  // Function to toggle saving a product
  const toggleSaveProduct = useCallback(async (artiId: number, isSaved: boolean, UnitsPresentationId: number = 1) => {
    try {
      if (isSaved) {
        // Find the SavedProductId for this artiId and UnitsPresentationId
        const products = await savedProductsManager.getSavedProducts();
        const savedProduct = products.find(
          p => p.artiId === artiId && p.UnitsPresentationId === UnitsPresentationId
        );
        
        if (savedProduct) {
          await savedProductsManager.removeSavedProduct(savedProduct.SavedProductId);
          
          // Update local state
          setSavedPrices(prev => prev.filter(
            p => !(p.artiId === artiId && p.UnitsPresentationId === UnitsPresentationId)
          ));
        }
      } else {
        // Add the product to saved products
        await savedProductsManager.addSavedProduct(artiId, UnitsPresentationId);
        
        // Fetch the product details to get the icon
        const productDetails = await getProductById(artiId);
        
        // Update local state
        setSavedPrices(prev => [
          ...prev,
          {
            artiId,
            UnitsId: 1, // Default value, will be fetched from UnitsPresentationId
            PresentationId: 1, // Default value, will be fetched from UnitsPresentationId
            UnitsPresentationId: UnitsPresentationId,
            icon: productDetails.Icon || 'package', // Default to 'package' if no icon
          }
        ]);
      }
      
      return !isSaved;
    } catch (err) {
      console.error('Error toggling save product:', err);
      return isSaved; // Return original state on error
    }
  }, []);
  
  // Function to check if a product is saved
  const isProductSaved = useCallback(async (artiId: number, UnitsPresentationId: number = 1) => {
    try {
      return await savedProductsManager.isProductSaved(artiId, UnitsPresentationId);
    } catch (err) {
      console.error('Error checking if product is saved:', err);
      return false;
    }
  }, []);
  
  return {
    savedPrices,
    featuredPriceItem,
    getRandomFeaturedPriceItem,
    navigateToProductDetail,
    toggleSaveProduct,
    isProductSaved,
    isLoading,
    error
  };
};

export default useHomeActions;