// src/features/detail/components/producto_insumo_body/AIInsights.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NewsBulletTransition } from '@/src/components/animations/NewsBulletTransition';

interface AIInsightsProps {
  insights: string[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle cycling through insights
  const showNextInsight = () => {
    setIsVisible(false);
    
    // After exit animation completes, change the insight and start entry animation
    setTimeout(() => {
      setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      setIsVisible(true);
    }, 300); // Match this with exit animation duration
  };

  // Auto-rotate insights every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      showNextInsight();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Render a single insight with our custom bullet point
  const renderInsight = (insight: string, index: number) => (
    <View key={index} className="flex-row mb-2">
      <View className="bg-primary-default w-2 h-2 rounded-full mt-2 mr-2" />
      <Text className="flex-1 text-gray-700">{insight}</Text>
    </View>
  );

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold">AI Insights</Text>
        <TouchableOpacity 
          onPress={showNextInsight}
          className="bg-primary-light px-3 py-1 rounded-full"
        >
          <Text className="text-primary-default text-xs">Siguiente</Text>
        </TouchableOpacity>
      </View>
      
      <View className="bg-gray-50 p-4 rounded-lg">
        {/* Only render the current insight with transition */}
        <NewsBulletTransition
          isActive={isVisible}
          index={0}
        >
          {renderInsight(insights[currentInsightIndex], currentInsightIndex)}
        </NewsBulletTransition>
      </View>
    </View>
  );
};

export default AIInsights;