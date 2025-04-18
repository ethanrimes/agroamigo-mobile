// src/features/home/components/body/SavedPricesCarousel.tsx
import React from 'react';
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Heading } from '@/components/ui/heading';
import { CarouselScrolling } from '../../../../components/animations';
import SavedPriceTile from './SavedPriceTile';

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
  return (
    <VStack
      className="w-full space-y-md px-4"
    >
      <Heading
        size="xl"
        className="text-typography-900"
      >
        Precios Guardados
      </Heading>
      
      <Box className="h-[130px]">
        <CarouselScrolling
          autoScroll={true}
          scrollDuration={25000}
          contentContainerStyle={{ paddingHorizontal: 4 }} // xs spacing
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