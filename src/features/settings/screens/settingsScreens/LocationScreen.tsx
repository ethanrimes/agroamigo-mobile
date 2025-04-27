// src/features/settings/screens/settingsScreens/LocationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import ThemeHeader from '@/src/features/shared/themeHeader/ThemeHeader';
import SearchableDropdown from '@/src/features/shared/searchableDropdown/SearchableDropdown';
import useLocationSetting from '@/src/features/settings/hooks/useLocationSetting';
import { getMarketById } from '@/src/services/supabase/entities/mercado';

const LocationScreen: React.FC = () => {
  const { theme } = useTheme();
  const { currentLocationId, setNewLocation } = useLocationSetting();
  const [initialMarket, setInitialMarket] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Fetch the initial market data to pass to the dropdown
  React.useEffect(() => {
    const fetchInitialMarket = async () => {
      try {
        const market = await getMarketById(currentLocationId);
        setInitialMarket(market);
      } catch (error) {
        console.error('Error fetching initial market:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialMarket();
  }, [currentLocationId]);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ThemeHeader title="Ubicación" showBackButton />
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Ubicación Predeterminada
          </Text>
          
          <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
            La ubicación seleccionada determina los precios que verás por defecto en la aplicación. 
            Puedes cambiar esta configuración en cualquier momento.
          </Text>
          
          <View style={styles.dropdownContainer}>
            {!isLoading && (
              <SearchableDropdown
                placeholder="Buscar mercados..."
                onItemSelect={setNewLocation}
                dataTypeOrder="mercado-producto"
                dataTypes={['mercado']}
                initialSelectedItem={initialMarket}
                initialSelectedType="mercado"
                containerStyle={styles.searchableDropdown}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  dropdownContainer: {
    marginTop: 8,
  },
  searchableDropdown: {
    width: '100%',
  }
});

export default LocationScreen;