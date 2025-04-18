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
  // State to track the current set of news items to display (0, 1, or 2)
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  
  // Calculate the total number of sets (9 items / 3 per set = 3 sets)
  const totalSets = Math.ceil(news.length / 3);
  
  // Rotate through news sets
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
    }, 8000); // Change every 8 seconds
    
    return () => clearInterval(interval);
  }, [totalSets]);
  
  // Calculate which items to show based on the active set
  const getVisibleNewsItems = () => {
    const startIndex = activeSetIndex * 3;
    return news.slice(startIndex, startIndex + 3);
  };

  // Get the currently visible news items
  const visibleNewsItems = getVisibleNewsItems();
  
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
          {visibleNewsItems.map((item, index) => (
            <NewsBulletTransition
              key={item.id}
              isActive={true}
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