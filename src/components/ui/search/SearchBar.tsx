// src/components/ui/search/SearchBar.tsx
import React from 'react';
import { View } from 'react-native';
import { SearchBar as RNESearchBar } from '@rneui/themed';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar ...',
  value,
  onChangeText,
  onSubmitEditing,
}) => {
  const { theme, rne } = useTheme();
  
  return (
    <View style={{ width: '100%' }}>
      <RNESearchBar
        placeholder={placeholder}
        value={value || ''}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        platform="default"
        containerStyle={{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          padding: 0,
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.background.primary,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
        }}
        inputStyle={{
          fontSize: theme.typography.fontSizes.md,
          color: theme.colors.text.primary,
        }}
        placeholderTextColor={theme.colors.text.tertiary}
      />
    </View>
  );
};

export default SearchBar;