// src/features/home/components/body/SavedPriceTile.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { VStack } from '../../../../components/ui/organization';
import { Box } from '../../../../components/ui/organization';
import { Typography } from '../../../../components/ui/typography';
import { TrendTicker } from '../../../../components/ui/data';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

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
  const { theme } = useTheme();
  
  return (
    <Pressable onPress={onPress}>
      <Box
        className="w-140 h-120"
        style={{
          backgroundColor: theme.colors.secondary.default,
          // borderRadius: theme.borderRadii.lg,
          padding: theme.spacing.spacing.md,
          marginRight: theme.spacing.spacing.md,
          ...theme.componentShadows.card,
        }}
      >
        <VStack className="flex-1 justify-between">
          <Typography
            variant="body2Medium"
            color={theme.colors.neutral.white}
          >
            {title}
          </Typography>
          
          <VStack space="xs">
            <Typography
              variant="headline4"
              color={theme.colors.neutral.white}
            >
              {price}
            </Typography>
            
            <TrendTicker value={trendValue} trend={trend} />
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default SavedPriceTile;