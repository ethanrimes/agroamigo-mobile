// src/components/ui/icons/ItemIcon.tsx
import React from 'react';
import { View } from 'react-native';
import { 
  Apple, 
  Banana, 
  Beef, 
  Carrot, 
  Cherry, 
  Egg, 
  Fish, 
  Grape, 
  Leaf, 
  Milk, 
//   Potato, 
  Wheat 
} from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface ItemIconProps {
  name: string;
  size?: number;
  color?: string;
}

const ItemIcon: React.FC<ItemIconProps> = ({ 
  name, 
  size = 24, 
  color 
}) => {
  const { theme } = useTheme();
  
  // Use theme color if no color is provided
  const iconColor = color || theme.colors.primary.default;
  
  // Map icon names to actual icon components
  const getIcon = () => {
    switch (name.toLowerCase()) {
      case 'apple':
        return <Apple size={size} color={iconColor} />;
      case 'banana':
        return <Banana size={size} color={iconColor} />;
      case 'beef':
        return <Beef size={size} color={iconColor} />;
      case 'carrot':
        return <Carrot size={size} color={iconColor} />;
      case 'cherry':
        return <Cherry size={size} color={iconColor} />;
      case 'egg':
        return <Egg size={size} color={iconColor} />;
      case 'fish':
        return <Fish size={size} color={iconColor} />;
      case 'grape':
        return <Grape size={size} color={iconColor} />;
      case 'leaf':
        return <Leaf size={size} color={iconColor} />;
      case 'milk':
        return <Milk size={size} color={iconColor} />;
    //   case 'potato':
    //     return <Potato size={size} color={iconColor} />;
      case 'wheat':
        return <Wheat size={size} color={iconColor} />;
      default:
        // Default to Leaf icon if no match
        return <Leaf size={size} color={iconColor} />;
    }
  };
  
  return (
    <View>
      {getIcon()}
    </View>
  );
};

export default ItemIcon;