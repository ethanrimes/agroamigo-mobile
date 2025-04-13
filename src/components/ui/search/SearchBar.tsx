// src/components/ui/search/SearchBar.tsx
import React from 'react';
import { 
  Input, 
  InputField, 
  InputSlot, 
  InputIcon, 
  Box 
} from '@gluestack-ui/themed';
import { Search } from 'lucide-react-native';
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
  const { theme } = useTheme();
  
  return (
    <Box width="100%">
      <Input
        backgroundColor={theme.colors.background.primary}
        borderColor={theme.colors.border.light}
        borderWidth={1}
        borderRadius={8}
      >
        <InputSlot paddingLeft={12}>
          <InputIcon as={Search} color={theme.colors.text.tertiary} />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={theme.colors.text.tertiary}
          color={theme.colors.text.primary}
          fontSize={theme.typography.fontSizes.md}
        />
      </Input>
    </Box>
  );
};

export default SearchBar;