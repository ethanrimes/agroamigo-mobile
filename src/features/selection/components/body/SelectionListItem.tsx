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
  trend: 'up' | 'down' | 'stable'; // Matches what's used in your data model
  trendValue?: string;
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
  // Convert trend to the format expected by TrendTicker
  const trendForTicker = trend === 'stable' ? 'neutral' : trend;

  return (
    <Pressable onPress={onPress}>
      <Box className="p-4 border-b border-neutral-silver">
        <HStack className="justify-between items-center">
          <Box className="flex-1">
            <Text className="text-base font-medium text-neutral-black">{title}</Text>
            {subtitle && (
              <Text className="text-sm text-neutral-darkGrey mt-1">{subtitle}</Text>
            )}
          </Box>
          
          <HStack className="space-x-4 items-center">
            <Text className="text-base font-medium text-neutral-black">{price}</Text>
            <TrendTicker trend={trendForTicker} value={trendValue} />
          </HStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default SelectionListItem;