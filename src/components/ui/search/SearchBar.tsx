// src/components/ui/search/SearchBar.tsx
import React from 'react';
import { View, TextInput } from "react-native";
import Box from "@/src/components/ui/layout/Box";
import { Search } from "lucide-react-native";

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
  return (
    <Box className="w-full">
      <View className="bg-background-50 border border-outline-100 rounded-lg flex-row items-center px-3 py-2">
        <Search size={20} color="#6B7280" style={{ marginRight: 8 }} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          className="text-typography-900 text-md flex-1"
          placeholderTextColor="#a3a3a3"
        />
      </View>
    </Box>
  );
};

export default SearchBar;