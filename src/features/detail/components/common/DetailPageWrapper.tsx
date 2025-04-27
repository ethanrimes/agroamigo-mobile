// src/features/detail/components/common/DetailPageWrapper.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface DetailPageWrapperProps {
  header: React.ReactNode;
  toggleComponent?: React.ReactNode;
  children: React.ReactNode;
  bottomContent?: React.ReactNode; // New prop for content below the card
  topContent?: React.ReactNode;    // New prop for content above the card
}

/**
 * Container component for all detail screens
 * Provides common styling and layout structure
 */
const DetailPageWrapper: React.FC<DetailPageWrapperProps> = ({ 
  header, 
  toggleComponent,
  children,
  bottomContent,
  topContent
}) => {
  const { theme, colors, borders, shadows } = useTheme();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={styles.headerContainer}>
          {header}
        </View>
        
        <View style={styles.mainContentContainer}>
          {toggleComponent && (
            <View style={styles.toggleContainer}>
              {toggleComponent}
            </View>
          )}
          
          {/* Content above the card */}
          {topContent && (
            <View style={styles.topContentContainer}>
              {topContent}
            </View>
          )}
          
          <View 
            style={[
              styles.contentCard, 
              { 
                backgroundColor: colors.background.primary,
                borderColor: colors.border.light,
                ...shadows.componentShadows.card
              }
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
          
          {/* Content below the card */}
          {bottomContent && (
            <View style={styles.bottomContentContainer}>
              {bottomContent}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    width: '100%',
  },
  mainContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    position: 'relative',
  },
  toggleContainer: {
    position: 'absolute',
    top: 0,
    right: 28,
    zIndex: 10,
  },
  topContentContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  contentCard: {
    flex: 1,
    marginTop: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
  },
  bottomContentContainer: {
    marginTop: -8,
    marginBottom: 16,
  },
});

export default DetailPageWrapper;