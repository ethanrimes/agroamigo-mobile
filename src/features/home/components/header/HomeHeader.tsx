// src/features/home/components/header/HomeHeader.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import SearchBar from '@/src/components/ui/search/SearchBar';
import VStack from '@/src/components/ui/layout/VStack';

const HomeHeader: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  
  const handleSubmitSearch = () => {
    // Handle search submission logic here
    console.log('Search submitted:', searchQuery);
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
        
        <SearchBar 
          placeholder="Buscar ..."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmitSearch}
        />
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
    alignItems: 'center', // Center the content horizontally
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
  },
});

export default HomeHeader;