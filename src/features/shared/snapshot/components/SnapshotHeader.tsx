// src/features/shared/snapshot/components/SnapshotHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SnapshotHeaderProps {
  title: string;
  iconSource?: any; // Can be a require() or a URL
  iconName?: string; // For using a system icon
}

const SnapshotHeader: React.FC<SnapshotHeaderProps> = ({
  title,
  iconSource,
  iconName,
}) => {
  const { colors, typography, spacing } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.titleContainer}>
        {/* Icon */}
        {iconSource && (
          <Image 
            source={iconSource} 
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        
        {/* Title */}
        <Text 
          style={[
            styles.title, 
            // { 
            //   color: colors.text.primary,
            //   ...typography.textStyles.headline3,
            //   marginLeft: iconSource ? spacing.md : 0,
            // }
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  title: {
    flex: 1,
  },
});

export default SnapshotHeader;