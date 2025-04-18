// src/features/home/components/body/HomeNewsSection.tsx
import React, { useState, useEffect } from 'react';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { NewsBulletTransition } from '../../../../components/animations';
import NewsBullet from './NewsBullet';

interface NewsItem {
  id: string;
  text: string;
}

interface HomeNewsSectionProps {
  news: NewsItem[];
}

const HomeNewsSection: React.FC<HomeNewsSectionProps> = ({
  news,
}) => {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  
  // Rotate through news items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % news.length);
    }, 5000); // Change every 5 seconds
    
    return () => clearInterval(interval);
  }, [news.length]);
  
  return (
    <VStack
      className="w-full space-y-md px-4 mb-xl"
    >
      <Heading
        size="xl"
        className="text-typography-900"
      >
        Noticias
      </Heading>
      
      <Box className="h-[150px]">
        <VStack className="space-y-md">
          {news.map((item, index) => (
            <NewsBulletTransition
              key={item.id}
              isActive={index === activeNewsIndex}
              index={index}
            >
              <NewsBullet text={item.text} />
            </NewsBulletTransition>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

export default HomeNewsSection;