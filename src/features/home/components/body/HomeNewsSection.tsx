// src/features/home/components/body/HomeNewsSection.tsx
import React, { useState, useEffect } from 'react';
import { VStack } from '../../../../components/ui/organization';
import { Box } from '../../../../components/ui/organization';
import { Heading } from '../../../../components/ui/typography';
import { NewsBulletTransition } from '../../../../components/animations';
import NewsBullet from './NewsBullet';
import { useTheme } from '../../../../theme/providers/ThemeProvider';

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
  const { theme } = useTheme();
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
      className="w-full"
      space="md"
      style={{
        paddingHorizontal: theme.spacing.screenSpacing.screenMarginHorizontal,
        marginBottom: theme.spacing.spacing.xl
      }}
    >
      <Heading
        variant="headline4"
        color={theme.colors.text.primary}
      >
        Noticias
      </Heading>
      
      <Box className="h-150">
        <VStack space="md">
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