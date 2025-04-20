// src/features/shared/searchableDropdown/components/DropdownItem.tsx
import React, { useRef } from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { TapGestureHandler, State, HandlerStateChangeEvent, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { useSnapshotStore, SnapshotType } from '@/src/store/snapshotStore';

interface DropdownItemProps {
  item: any;
  type: string;
  onSelect: (item: any, type: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  type,
  onSelect,
}) => {
  const { theme } = useTheme();
  const tapRef = useRef<TapGestureHandler>(null);
  // Import openModal from the store
  const { openModal } = useSnapshotStore();

  // Get the display name based on the data type
  const getDisplayName = () => {
    switch (type) {
      case 'producto':
        return item.artiNombre || 'Unknown Product';
      case 'mercado':
        return item.Mercado || 'Unknown Market';
      case 'municipio':
        return item.Municipio || 'Unknown Municipality';
      case 'departamento':
        return item.Departamento || 'Unknown Department';
      case 'subcategory':
        return item.Subcategory || 'Unknown Subcategory';
      case 'majorCategory':
        return item.MajorCategory || 'Unknown Category';
      default:
        return 'Unknown Item';
    }
  };

  // Get the correct ID based on the type
  const getItemId = () => {
    switch (type) {
      case 'producto':
        return item.artiId;
      case 'mercado':
        // Adjust this based on your actual market ID property
        return item.id || item.mercadoId || item.MercadoId;
      default:
        return null;
    }
  };

  // Handler for tap gesture state changes
  const handleGestureEvent = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    const { state } = event.nativeEvent;

    if (state === State.END) {
      console.log('[DropdownItem] TAP END for:', getDisplayName());
      
      // Call the parent onSelect function if provided
      if (typeof onSelect === 'function') {
        console.log('[DropdownItem] Calling onSelect function');
        onSelect(item, type);
      }
      
      // IMPORTANT: Open the modal if the type is supported
      const itemId = getItemId();
      if ((type === 'producto' || type === 'mercado') && itemId !== null && typeof itemId === 'number') {
        console.log(`[DropdownItem] Opening snapshot modal with type=${type}, id=${itemId}`);
        openModal(type as SnapshotType, itemId);
      } else {
        console.log(`[DropdownItem] Not opening modal for type=${type}, id=${itemId}`);
      }
    }
  };

  return (
    <TapGestureHandler
      ref={tapRef}
      onHandlerStateChange={handleGestureEvent}
      numberOfTaps={1}
      maxDurationMs={1000}
      shouldCancelWhenOutside={true}
      enabled={true}
      testID={`dropdown-item-${type}-${getDisplayName()}`}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background.primary },
        ]}
        // Add pointer events logging for debugging
        onTouchStart={() =>
          console.log('[DropdownItem] onTouchStart for:', getDisplayName())
        }
      >
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.itemText,
              { color: theme.colors.text.primary },
            ]}
            numberOfLines={1}
          >
            {getDisplayName()}
          </Text>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44, // Ensure minimum touch target size
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default DropdownItem;