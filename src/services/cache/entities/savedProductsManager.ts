// src/services/cache/entities/savedProductsManager.ts

import { SecureStorageStrategy } from '../strategies/secureStorageStrategy';
import { generateCacheKey } from '../utils/keyGenerator';
import { DEFAULT_TTL } from '../utils/expiration';

interface SavedProduct {
  SavedProductId: number; // primary key, auto-generated integer
  artiId: number; // matches the producto table
  UnitsPresentationId: number; // matches the unitspresentation table
  dateAdded: string | null;
}

class SavedProductsManager {
  private storage: SecureStorageStrategy;
  private storageKey: string;
  
  constructor() {
    this.storage = new SecureStorageStrategy();
    this.storageKey = generateCacheKey({
      entity: 'SavedProducts',
      method: 'list'
    });
  }
  
  /**
   * Get all saved products
   * @returns Array of saved products
   */
  async getSavedProducts(): Promise<SavedProduct[]> {
    try {
      const savedProducts = await this.storage.get<SavedProduct[]>(this.storageKey);
      
      if (!savedProducts) {
        // Return default data if no saved products exist
        return this.getDefaultProducts();
      }
      
      return savedProducts;
    } catch (error) {
      console.error('Error getting saved products:', error);
      return this.getDefaultProducts();
    }
  }
  
  /**
   * Add a product to saved list
   * @param artiId The product ID to save
   * @param UnitsPresentationId The units presentation ID (defaults to 1 if not provided)
   * @returns The updated list of saved products
   */
  async addSavedProduct(artiId: number, UnitsPresentationId: number = 1): Promise<SavedProduct[]> {
    try {
      const currentProducts = await this.getSavedProducts();
      
      // Check if product is already saved with the same UnitsPresentationId
      if (currentProducts.some(product => 
          product.artiId === artiId && 
          product.UnitsPresentationId === UnitsPresentationId)) {
        return currentProducts;
      }
      
      // Get the next available ID
      const nextId = this.getNextAvailableId(currentProducts);
      
      // Add new product with auto-generated ID and current date
      const newProduct: SavedProduct = {
        SavedProductId: nextId,
        artiId,
        UnitsPresentationId: UnitsPresentationId,
        dateAdded: new Date().toISOString()
      };
      
      const updatedProducts = [...currentProducts, newProduct];
      
      // Save updated list
      await this.storage.set<SavedProduct[]>(
        this.storageKey, 
        updatedProducts, 
        DEFAULT_TTL.PERMANENT
      );
      
      return updatedProducts;
    } catch (error) {
      console.error('Error adding saved product:', error);
      return this.getDefaultProducts();
    }
  }
  
  /**
   * Remove a product from saved list by its SavedProductId
   * @param savedProductId The saved product ID to remove
   * @returns The updated list of saved products
   */
  async removeSavedProduct(savedProductId: number): Promise<SavedProduct[]> {
    try {
      const currentProducts = await this.getSavedProducts();
      
      // Filter out the product to remove
      const updatedProducts = currentProducts.filter(
        product => product.SavedProductId !== savedProductId
      );
      
      // Save updated list
      await this.storage.set<SavedProduct[]>(
        this.storageKey, 
        updatedProducts, 
        DEFAULT_TTL.PERMANENT
      );
      
      return updatedProducts;
    } catch (error) {
      console.error('Error removing saved product:', error);
      return this.getDefaultProducts();
    }
  }
  
  /**
   * Check if a product is saved
   * @param artiId The product ID to check
   * @param UnitsPresentationId The units presentation ID to check
   * @returns Boolean indicating if product is saved with that presentation
   */
  async isProductSaved(artiId: number, UnitsPresentationId: number): Promise<boolean> {
    try {
      const savedProducts = await this.getSavedProducts();
      return savedProducts.some(product => 
        product.artiId === artiId && 
        product.UnitsPresentationId === UnitsPresentationId
      );
    } catch (error) {
      console.error('Error checking if product is saved:', error);
      return false;
    }
  }
  
  /**
   * Get saved product by ID
   * @param savedProductId The saved product ID to find
   * @returns The saved product if found, null otherwise
   */
  async getSavedProductById(savedProductId: number): Promise<SavedProduct | null> {
    try {
      const savedProducts = await this.getSavedProducts();
      return savedProducts.find(product => product.SavedProductId === savedProductId) || null;
    } catch (error) {
      console.error('Error getting saved product by ID:', error);
      return null;
    }
  }
  
  /**
   * Get all saved products for a specific product
   * @param artiId The product ID to find saved instances for
   * @returns Array of saved products matching the artiId
   */
  async getSavedProductsByArtiId(artiId: number): Promise<SavedProduct[]> {
    try {
      const savedProducts = await this.getSavedProducts();
      return savedProducts.filter(product => product.artiId === artiId);
    } catch (error) {
      console.error('Error getting saved products by artiId:', error);
      return [];
    }
  }
  
  /**
   * Clear all saved products
   * @returns Empty array after clearing
   */
  async clearSavedProducts(): Promise<SavedProduct[]> {
    try {
      const emptyList: SavedProduct[] = [];
      await this.storage.set<SavedProduct[]>(
        this.storageKey, 
        emptyList, 
        DEFAULT_TTL.PERMANENT
      );
      return emptyList;
    } catch (error) {
      console.error('Error clearing saved products:', error);
      return this.getDefaultProducts();
    }
  }
  
  /**
   * Get the next available ID for a new saved product
   * @param currentProducts Current list of saved products
   * @returns Next available integer ID
   */
  private getNextAvailableId(currentProducts: SavedProduct[]): number {
    if (currentProducts.length === 0) {
      return 1;
    }
    
    // Find the highest ID currently in use
    const highestId = Math.max(...currentProducts.map(product => product.SavedProductId));
    
    // Return the next sequential ID
    return highestId + 1;
  }
  
  /**
   * Get default products when no data exists
   * @returns Default products array
   */
  private getDefaultProducts(): SavedProduct[] {
    return [
      { 
        SavedProductId: 1, 
        artiId: 1, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      },
      { 
        SavedProductId: 2, 
        artiId: 2, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      },
      { 
        SavedProductId: 3, 
        artiId: 3, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      },
      { 
        SavedProductId: 4, 
        artiId: 4, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      },
      { 
        SavedProductId: 5, 
        artiId: 5, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      },
      { 
        SavedProductId: 6, 
        artiId: 6, 
        UnitsPresentationId: 1, 
        dateAdded: null 
      }
    ];
  }
}

// Export a singleton instance for easy access
export const savedProductsManager = new SavedProductsManager();

// Also export the class and interface for flexibility
export { SavedProductsManager, SavedProduct };