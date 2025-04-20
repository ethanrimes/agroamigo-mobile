// src/store/snapshotStore.ts
import { create } from 'zustand';

// Define the types for the snapshot modal
export type SnapshotType = 'producto' | 'mercado' | 'insumo' | null;

// Define the store state interface
interface SnapshotState {
  // Visibility state
  isVisible: boolean;
  
  // Type of modal (product, market, input)
  snapshotType: SnapshotType;
  
  // ID of the selected item
  itemId: number | null;

  // Actions to control the modal
  openModal: (type: SnapshotType, id: number) => void;
  closeModal: () => void;
}

// Create the store with initial state and actions
// In snapshotStore.ts, modify the store:
export const useSnapshotStore = create<SnapshotState>((set) => ({
    // Initial state
    isVisible: false,
    snapshotType: null,
    itemId: null,
  
    // Actions
    openModal: (type, id) => {
      console.log('snapshotStore - openModal called with:', type, id);
      set({
        isVisible: true,
        snapshotType: type,
        itemId: id,
      });
      console.log('snapshotStore - Modal state updated to visible');
    },
    
    closeModal: () => {
      console.log('snapshotStore - closeModal called');
      set({
        isVisible: false,
        // Keep the type and id in state for transition animations
      });
      console.log('snapshotStore - Modal state updated to hidden');
    },
  }));

export default useSnapshotStore;