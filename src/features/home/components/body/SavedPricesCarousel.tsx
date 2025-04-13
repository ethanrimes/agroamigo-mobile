// src/features/home/components/body/SavedPricesCarousel.tsx
import React from 'react';
import { VStack } from "../../../../components/ui/organization";
import { Box } from "../../../../components/ui/organization";
import { Heading } from '../../../../components/ui/typography';
import { CarouselScrolling } from '../../../../components/animations';
import SavedPriceTile from './SavedPriceTile';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

interface PriceItem {
  id: string;
  title: string;
  price: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

interface SavedPricesCarouselProps {
  prices: PriceItem[];
  onPricePress?: (id: string) => void;
}

const SavedPricesCarousel: React.FC<SavedPricesCarouselProps> = ({
  prices,
  onPricePress,
}) => {
  const { theme } = useTheme();
  
  return (
    <VStack
      className="w-full"
      space="md"
      style={{
        paddingHorizontal: theme.spacing.screenSpacing.screenMarginHorizontal
      }}
    >
      <Heading
        variant="headline4"
        color={theme.colors.text.primary}
      >
        Precios Guardados
      </Heading>
      
      <Box className="h-130">
        <CarouselScrolling
          autoScroll={true}
          scrollDuration={25000}
          contentContainerStyle={{ paddingHorizontal: theme.spacing.spacing.xs }}
        >
          {prices.map((item) => (
            <SavedPriceTile
              key={item.id}
              title={item.title}
              price={item.price}
              trend={item.trend}
              trendValue={item.trendValue}
              onPress={() => onPricePress && onPricePress(item.id)}
            />
          ))}
        </CarouselScrolling>
      </Box>
    </VStack>
  );
};

export default SavedPricesCarousel;