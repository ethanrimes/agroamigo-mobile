// src/components/ui/icons/CategoryIcon.tsx
import React from 'react';
import { View } from 'react-native'; // use lucide icons
import { 
  Apple, 
  Leaf, 
  ShoppingBag, 
  Globe, 
  Tractor, 
  Wheat, 
  DollarSign, 
  Truck,
  Droplet,
  Sun,
  SproutIcon
} from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

export type CategoryIconName = 
  | 'apple' 
  | 'leaf' 
  | 'shopping-bag' 
  | 'globe' 
  | 'tractor' 
  | 'wheat' 
  | 'dollar' 
  | 'truck'
  | 'water'
  | 'sun'
  | 'sprout';

interface CategoryIconProps {
  name: CategoryIconName;
  size?: number;
  color?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  name, 
  size = 24, 
  color 
}) => {
  const { colors } = useTheme();
  const iconColor = color || colors.primary.default;

  // Map names to icons
  const renderIcon = () => {
    switch (name) {
      case 'apple':
        return <Apple size={size} color={iconColor} />;
      case 'leaf':
        return <Leaf size={size} color={iconColor} />;
      case 'shopping-bag':
        return <ShoppingBag size={size} color={iconColor} />;
      case 'globe':
        return <Globe size={size} color={iconColor} />;
      case 'tractor':
        return <Tractor size={size} color={iconColor} />;
      case 'wheat':
        return <Wheat size={size} color={iconColor} />;
      case 'dollar':
        return <DollarSign size={size} color={iconColor} />;
      case 'truck':
        return <Truck size={size} color={iconColor} />;
      case 'water':
        return <Droplet size={size} color={iconColor} />;
      case 'sun':
        return <Sun size={size} color={iconColor} />;
      case 'sprout':
        return <SproutIcon size={size} color={iconColor} />;
      default:
        // Default to leaf icon if name doesn't match
        return <Leaf size={size} color={iconColor} />;
    }
  };

  return (
    <View>
      {renderIcon()}
    </View>
  );
};

export default CategoryIcon;