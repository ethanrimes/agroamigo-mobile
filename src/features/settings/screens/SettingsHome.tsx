// src/features/settings/screens/SettingsHome.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import ThemeHeader from '@/src/components/molecules/ThemeHeader';
import SettingsHeader from '../components/SettingsHeader';
import SettingsSection from '../components/SettingsSection';
import SettingsItem from '../components/SettingsItem';

const SettingsHome: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ThemeHeader location="Ciudad de México" />
      <SettingsHeader title="Configuración" />
      
      <ScrollView style={styles.scrollView}>
        <SettingsSection title="Preferencias">
          <SettingsItem title="Tema visual" route="/settings/theme" />
          <SettingsItem title="Letra" route="/settings/font" />
        </SettingsSection>

        <SettingsSection title="Datos">
          <SettingsItem title="Ubicación predeterminada" route="/settings/location" />
          <SettingsItem title="Control de información" route="/settings/products-visibility" />
          <SettingsItem title="Caché sin conexión" route="/settings/offline-cache" />
        </SettingsSection>

        <SettingsSection title="Permisos">
          <SettingsItem title="Usar mi ubicación" route="/settings/location-permission" />
          <SettingsItem title="Recibir notificaciones" route="/settings/notifications" />
        </SettingsSection>

        <SettingsSection title="Información">
          <SettingsItem title="Sobre la aplicación" route="/settings/about" />
          <SettingsItem title="Fuentes de información" route="/settings/sources" />
          <SettingsItem title="Versión" route="/settings/version" />
        </SettingsSection>
        
        {/* Add some bottom spacing for scrolling */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default SettingsHome;