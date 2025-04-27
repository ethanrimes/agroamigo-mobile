// src/features/selection/components/header/SelectionHeader.tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import VStack from '@/src/components/ui/layout/VStack';
import Box from '@/src/components/ui/layout/Box';
import { LocationComponent } from '@/src/components/ui/data';
import SearchableDropdown from '@/src/features/shared/searchableDropdown';
import FilterButton from './FilterButton';
import ThemeHeader from '@/src/features/shared/themeHeader/ThemeHeader';
import { DataType } from '@/src/features/shared/searchableDropdown/hooks/useDropdownData';

interface SelectionHeaderProps {
  title: string;
  subtitle?: string;
  location: string;
  onFilterPress?: () => void;
  onItemSelect?: (item: any, type: string) => void;
  dataTypes?: DataType[];
  dataTypeOrder?: 'producto-mercado' | 'mercado-producto';
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  title,
  subtitle = 'Explorar y entender últimos precios',
  location,
  onFilterPress,
  onItemSelect,
  dataTypes = ['producto', 'mercado'],
  dataTypeOrder = 'producto-mercado',
}) => {
  
  const styles = StyleSheet.create({
    searchFilterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    searchContainer: {
      flex: 1,
      marginRight: 8,
    },
    filterButtonContainer: {
      width: 48,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredTextContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  
  // Handle item selection if no handler was provided by parent
  const handleItemSelection = (item: any, type: string) => {
    if (onItemSelect) {
      onItemSelect(item, type);
    } else {
      console.log('Selection Header - Item selected:', item, type);
      // Default implementation if needed
    }
  };

  return (
    <VStack className="w-full">
      {/* Replace ThinHeaderStrip with ThemeHeader */}
      <ThemeHeader title="Agro Amigo" />
      
      <Box className="w-full px-4 py-4">
        <VStack className="w-full space-y-2">
          {/* Center the title and subtitle */}
          <View style={styles.centeredTextContainer}>
            <Text className="text-2xl font-semibold text-neutral-black">{title}</Text>
            <Text className="text-base text-neutral-grey">{subtitle}</Text>
          </View>
          
          {/* SearchableDropdown with Filter Button */}
          <Box className="pt-4 w-full">
            <View style={styles.searchFilterContainer}>
              <View style={styles.searchContainer}>
                <SearchableDropdown
                  placeholder="Buscar..."
                  onItemSelect={handleItemSelection}
                  dataTypes={dataTypes}
                  dataTypeOrder={dataTypeOrder}
                  enableSnapshotModal={true}
                />
              </View>
              <View style={styles.filterButtonContainer}>
                <FilterButton onPress={onFilterPress} />
              </View>
            </View>
          </Box>
          
          {/* LocationComponent */}
          <Box className="pt-2 items-center">
            <LocationComponent location={location} />
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default SelectionHeader;