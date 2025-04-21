// src/features/shared/snapshot/components/SnapshotHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SnapshotHeaderProps {
  title: string;
  iconSource?: any; // Can be a require() or a URL
  iconName?: string; // For using a system icon
  subtitle?: string;
}

const SnapshotHeader: React.FC<SnapshotHeaderProps> = ({
  title,
  iconSource,
  iconName,
  subtitle,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={styles.container}>
      {/* Main header section with title and icon */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {title}
        </Text>
        
        {/* Icon */}
        {iconSource && (
          <Image 
            source={iconSource} 
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        
        {/* Placeholder for icon without source */}
        {!iconSource && iconName && (
          <View style={styles.iconPlaceholder}>
            {/* This would be replaced with an actual icon component */}
            <Text style={styles.iconText}>{iconName}</Text>
          </View>
        )}
      </View>
      
      {/* Subtitle section (e.g., location) */}
      {subtitle && (
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    flex: 1,
  },
  icon: {
    width: 48,
    height: 48,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
  },
  subtitleContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default SnapshotHeader;