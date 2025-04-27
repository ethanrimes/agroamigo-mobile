// src/components/ui/search/SearchBar.tsx
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ViewStyle,
  TextStyle
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onClear?: () => void;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  rightElement?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  value,
  onChangeText,
  onFocus,
  onClear,
  containerStyle,
  inputStyle,
  rightElement,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine if the search bar has data
  const hasData = value.trim().length > 0;
  
  // Handle clearing the search text
  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };
  
  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };
  
  // Handle blur events
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hasData 
            ? 'rgba(40, 200, 136, 0.05)' 
            : theme.colors.background.secondary,
          borderColor: isFocused 
            ? theme.colors.primary.default 
            : theme.colors.border.light,
          borderWidth: isFocused ? 2 : 1,
        },
        containerStyle,
      ]}
    >
      {/* Search Icon */}
      <Search
        width={20}
        height={20}
        color={hasData ? theme.colors.primary.default : theme.colors.text.tertiary}
      />
      
      {/* Text Input */}
      <TextInput
        style={[
          styles.input,
          {
            color: hasData 
              ? theme.colors.text.primary 
              : theme.colors.text.secondary,
            fontWeight: hasData ? 'bold' : 'normal',
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      {/* Right elements: Clear button or custom element */}
      {hasData ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X
            width={18}
            height={18}
            color={theme.colors.text.tertiary}
          />
        </TouchableOpacity>
      ) : rightElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 48,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;