// src/features/shared/snapshot/snapshotModal.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ModalAnimation from '@/src/components/animations/ModalAnimation';
import { useSnapshotStore } from '@/src/store/snapshotStore';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Import specific snapshot modals
import ProductoSnapshot from './modals/productoSnapshot';
import MercadoSnapshot from './modals/mercadoSnapshot';
// import InsumoSnapshot from './modals/insumoSnapshot';

const SnapshotModal: React.FC = () => {
    const { colors, spacing } = useTheme();
    
    // Get modal state from store
    const { 
      isVisible, 
      snapshotType, 
      itemId, 
      closeModal 
    } = useSnapshotStore();
    
    // Add debug logging when the component renders
    console.log('[SnapshotModal] Rendered with state:', { isVisible, snapshotType, itemId });
    
    // Add effect to log when visibility changes
    useEffect(() => {
      console.log('[SnapshotModal] Visibility changed:', { isVisible, snapshotType, itemId });
    }, [isVisible, snapshotType, itemId]);
    
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
        case 'mercado':
          console.log('[SnapshotModal] Rendering MercadoSnapshot with ID:', itemId);
          return <MercadoSnapshot marketId={itemId} />;
      //   case 'insumo':
      //     return <InsumoSnapshot insumoId={itemId} />;
        default:
          console.log('[SnapshotModal] Unknown snapshot type:', snapshotType);
          return null;
      }
    };
    
    return (
      <ModalAnimation
        visible={isVisible}
        onClose={closeModal}
        width="75%"
        height="75%"
      >
        <View style={styles.modalContent}>
          {/* The close button is now handled inside each component */}
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
    },
  });

export default SnapshotModal;