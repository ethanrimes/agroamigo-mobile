// src/features/selection/components/body/SelectionListItem.tsx
import React from 'react';
import { Text, Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { TrendTicker } from '@/src/components/ui/data';

interface SelectionListItemProps {
  title: string;
  subtitle?: string;
  price: string;
  trend: 'up' | 'down' | 'neutral'; // Changed to match TrendTicker's expected values
  trendValue?: string; // Added new prop for the trend value
  onPress?: () => void;
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({
  title,
  subtitle,
  price,
  trend,
  trendValue = "", // Default empty string if not provided
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box className="w-full border-b border-neutral-silver py-3 px-4">
        <HStack className="justify-between items-center">
          <Box className="flex-1">
            <Text className="text-base font-medium text-neutral-black">{title}</Text>
            {subtitle && (
              <Text className="text-sm text-neutral-grey">
                {subtitle}
              </Text>
            )}
          </Box>
          
          <HStack className="items-center space-x-2">
            <Text className="text-base font-medium text-neutral-black">
              {price}
            </Text>
            <TrendTicker value={trendValue} trend={trend} />
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default SelectionListItem;