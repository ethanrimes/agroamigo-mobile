// src/features/home/components/header/HomeHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import VStack from '@/src/components/ui/layout/VStack';
import SearchableDropdown from '@/src/features/shared/searchableDropdown';
import { LocationComponent } from '@/src/components/ui/data';
import useFormattedLocation from '../../hooks/useFormattedLocation';

const HomeHeader: React.FC = () => {
  const { theme } = useTheme();
  const formattedLocation = useFormattedLocation();
  
  // Handle selection from the search dropdown
  const handleSearchItemSelect = (item: any, type: string) => {
    console.log('HOME HEADER - Item selected:', item, type);
    // Example implementation - can be customized based on requirements
    const itemName = type === 'producto' 
      ? item.artiNombre 
      : type === 'mercado' 
        ? item.Mercado 
        : 'Selected item';
    
    // Here you would typically navigate to a details screen
    // or perform some other action based on the selected item
  };
  
  return (
    <View style={styles.container}>
      <VStack className="space-y-4">
        <View style={styles.welcomeContainer}>
          <Text style={[
            styles.welcomeTitle, 
            { color: theme.colors.text.primary, textAlign: 'center' }
          ]}>
            Bienvenido
          </Text>
          <Text style={[
            styles.welcomeSubtitle, 
            { color: theme.colors.text.secondary, textAlign: 'center' }
          ]}>
            Los precios al día a la mano
          </Text>
        </View>
        
        {/* SearchableDropdown with custom placeholder */}
        <View style={styles.searchContainer}>
          <SearchableDropdown 
            placeholder="Buscar productos, mercados..."
            onItemSelect={handleSearchItemSelect}
            dataTypeOrder="producto-mercado"
            enableSnapshotModal={true}
          />
        </View>
        
        {/* LocationComponent displaying the current location */}
        <View style={styles.locationContainer}>
          <LocationComponent location={formattedLocation} />
        </View>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  welcomeContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
  },
  searchContainer: {
    width: '100%',
    zIndex: 1000, // Ensure dropdown appears above other elements
  },
  locationContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  }
});

export default HomeHeader;