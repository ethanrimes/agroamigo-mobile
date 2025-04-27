// src/features/detail/components/common/DetailPageWrapper.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface DetailPageWrapperProps {
  header: React.ReactNode;
  toggleComponent?: React.ReactNode;
  children: React.ReactNode;
  bottomContent?: React.ReactNode; // Content below the card
  topContent?: React.ReactNode;    // Content above the card
}

/**
 * Container component for all detail screens
 * Provides common styling and layout structure with a scrollable container
 */
const DetailPageWrapper: React.FC<DetailPageWrapperProps> = ({ 
  header, 
  toggleComponent,
  children,
  bottomContent,
  topContent
}) => {
  const { colors, shadows } = useTheme();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
        {/* Fixed header */}
        <View style={styles.headerContainer}>
          {header}
        </View>
        
        {/* Scrollable content */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.mainContentContainer}>
            {/* Toggle component remains fixed relative to scrollable area */}
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
            
            {/* Main content card */}
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
              {children}
            </View>
            
            {/* Content below the card */}
            {bottomContent && (
              <View style={styles.bottomContentContainer}>
                {bottomContent}
              </View>
            )}
          </View>
        </ScrollView>
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
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 24,
  },
  mainContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    position: 'relative',
  },
  toggleContainer: {
    position: 'absolute',
    top: 0,
    right: 12,
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
    padding: 16,
    overflow: 'hidden',
  },
  bottomContentContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default DetailPageWrapper;