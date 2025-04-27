// src/features/detail/components/header/DetailHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigationService } from '@/src/services/navigation';

interface DetailHeaderProps {
  title: string;
  children?: React.ReactNode;
}

/**
 * Base header component for all detail screens
 * Contains common header elements like the title and back button
 */
const DetailHeader: React.FC<DetailHeaderProps> = ({ 
  title,
  children 
}) => {
  const { colors } = useTheme();
  const { navigateBack } = useNavigationService();
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: colors.primary.dark }
      ]}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={navigateBack}
        >
          <ChevronLeft color="white" size={28} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          {title}
        </Text>
      </View>
      
      {children && (
        <View style={styles.contentContainer}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  }
});

export default DetailHeader;