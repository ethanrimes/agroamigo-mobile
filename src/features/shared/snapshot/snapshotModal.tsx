// src/features/shared/snapshot/snapshotModal.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ModalAnimation from '@/src/components/animations/ModalAnimation';
import { useSnapshotStore } from '@/src/store/snapshotStore';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useLocationStore } from '@/src/store/locationStore';

// Import specific snapshot modals
import ProductoSnapshot from './modals/productoSnapshot';
import MercadoSnapshot from './modals/mercadoSnapshot';
// import InsumoSnapshot from './modals/insumoSnapshot';

const SnapshotModal: React.FC = () => {
    const { colors, spacing } = useTheme();
    const { currentLocationId } = useLocationStore();
    
    // Get modal state from store
    const { 
      isVisible, 
      snapshotType, 
      itemId, 
      closeModal 
    } = useSnapshotStore();
    
    // Add debug logging when the component renders
    useEffect(() => {
      console.log('[SnapshotModal] Rendered with state:', { isVisible, snapshotType, itemId });
      console.log('[SnapshotModal] Current location ID:', currentLocationId);
    }, [isVisible, snapshotType, itemId, currentLocationId]);
    
    // Render the appropriate modal content based on type
    const renderContent = () => {
      console.log('[SnapshotModal] Rendering content for:', { itemId, snapshotType });
      
      if (!itemId) {
        console.log('[SnapshotModal] No itemId provided, returning null');
        return null;
      }
      
      switch (snapshotType) {
        case 'producto':
          console.log('[SnapshotModal] Rendering ProductoSnapshot with ID:', itemId);
          return <ProductoSnapshot productId={itemId} onClose={closeModal} />;
        // case 'mercado':
        //   console.log('[SnapshotModal] Rendering MercadoSnapshot with ID:', itemId);
        //   return <MercadoSnapshot marketId={itemId} onClose={closeModal} />;
      //   case 'insumo':
      //     return <InsumoSnapshot insumoId={itemId} onClose={closeModal} />;
        default:
          console.log('[SnapshotModal] Unknown snapshot type:', snapshotType);
          return null;
      }
    };
    
    return (
      <ModalAnimation
        visible={isVisible}
        onClose={closeModal}
        width="85%" // Adjusted for better viewing experience
        height="85%" // Adjusted for better viewing experience
      >
        <View style={styles.modalContent}>
          {renderContent()}
        </View>
      </ModalAnimation>
    );
  };
  
  const styles = StyleSheet.create({
    modalContent: {
      flex: 1,
      width: '100%',
      height: '100%',
      position: 'relative',
      borderRadius: 8,
      overflow: 'hidden',
    },
  });

export default SnapshotModal;