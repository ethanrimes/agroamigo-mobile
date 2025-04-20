// src/features/shared/searchableDropdown/components/DropdownItem.tsx
import React, { useRef } from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { TapGestureHandler, State, HandlerStateChangeEvent, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';

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

  // Handler for tap gesture state changes
  const handleGestureEvent = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    const { state } = event.nativeEvent;

    if (state === State.BEGAN) {
      console.log('[DropdownItem] TAP BEGAN for:', getDisplayName());
    } else if (state === State.ACTIVE) {
      console.log('[DropdownItem] TAP ACTIVE for:', getDisplayName());
    } else if (state === State.END) {
      console.log('[DropdownItem] TAP END for:', getDisplayName());
      if (typeof onSelect === 'function') {
        console.log('[DropdownItem] Calling onSelect function');
        onSelect(item, type);
      } else {
        console.error('[DropdownItem] onSelect is not a valid function:', onSelect);
      }
    } else if (state === State.FAILED) {
      console.log('[DropdownItem] TAP FAILED for:', getDisplayName());
    } else if (state === State.CANCELLED) {
      console.log('[DropdownItem] TAP CANCELLED for:', getDisplayName());
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
        onTouchEnd={() =>
          console.log('[DropdownItem] onTouchEnd for:', getDisplayName())
        }
        onTouchCancel={() =>
          console.log('[DropdownItem] onTouchCancel for:', getDisplayName())
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