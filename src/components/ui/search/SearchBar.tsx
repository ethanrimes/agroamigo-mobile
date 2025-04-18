import React from 'react';
import { Input } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { Search } from "lucide-react-native";
import { View, TextInput } from "react-native";

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
        <Search size={10} className="text-typography-500 mr-2" />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          className="text-typography-900 text-md flex-1"
          placeholderTextColor="#a3a3a3" // Adjust this to match your typography-400 color
        />
      </View>
    </Box>
  );
};

export default SearchBar;