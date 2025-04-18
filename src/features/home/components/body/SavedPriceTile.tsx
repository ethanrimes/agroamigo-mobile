// src/features/home/components/body/SavedPriceTile.tsx
import React from 'react';
import { Pressable } from "@/components/ui/pressable";
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { TrendTicker } from '../../../../components/ui/data';

interface SavedPriceTileProps {
  title: string;
  price: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  onPress?: () => void;
}

const SavedPriceTile: React.FC<SavedPriceTileProps> = ({
  title,
  price,
  trend,
  trendValue,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        className="w-[140px] h-[120px] bg-secondary-500 p-md mr-md rounded-lg shadow-md"
      >
        <VStack className="flex-1 justify-between">
          <Text
            className="text-white font-medium text-sm"
          >
            {title}
          </Text>
          
          <VStack className="space-y-xs">
            <Text
              className="text-white font-bold text-xl"
            >
              {price}
            </Text>
            
            <TrendTicker value={trendValue} trend={trend} />
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default SavedPriceTile;