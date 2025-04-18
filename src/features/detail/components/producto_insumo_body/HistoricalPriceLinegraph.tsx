// src/features/detail/components/producto_insumo_body/HistoricalPriceLinegraph.tsx
import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import BaseD3LineGraph from '@/src/components/charts/BaseD3LineGraph';
import GraphButtonWrapper from './GraphButtonWrapper';
import { LineGraphDataPoint } from '@/src/hooks/useD3';

interface HistoricalPriceLinegraphProps {
  data: {
    date: Date;
    value: number;
  }[];
}

const HistoricalPriceLinegraph: React.FC<HistoricalPriceLinegraphProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const { colors, typography } = useTheme();
  const [period, setPeriod] = useState<'5d' | '1m' | '6m'>('5d');
  
  // Default dummy data if none provided
  const getDummyData = (): LineGraphDataPoint[] => {
    const today = new Date();
    let daysToGenerate = 0;
    
    switch (period) {
      case '5d':
        daysToGenerate = 5;
        break;
      case '1m':
        daysToGenerate = 30;
        break;
      case '6m':
        daysToGenerate = 180;
        break;
    }
    
    return Array.from({ length: daysToGenerate }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (daysToGenerate - i - 1));
      
      // Generate some random price data with an upward trend
      const baseValue = 500;
      const randomFactor = Math.random() * 100;
      const trendFactor = i * (10000 / daysToGenerate);
      const value = baseValue + randomFactor + trendFactor;
      
      return { date, value };
    });
  };
  
  const chartData = data || getDummyData();
  
  return (
    <View className="mb-6">
      <Text 
        // style={typography.textStyles.headline4}
        className="font-semibold mb-4"
      >
        Tendencia histórica
      </Text>
      
      {/* Line Chart */}
      <View className="border border-gray-200 rounded-lg p-4 mb-4">
        <BaseD3LineGraph
          data={chartData}
          width={width - 48}
          height={250}
          color={colors.action.error}
          showGrid={true}
          smoothCurve={true}
          formatValue={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        
        {/* Period Selection Buttons */}
        <View className="flex-row justify-center mt-4">
          <GraphButtonWrapper 
            label="5 días" 
            isActive={period === '5d'} 
            onPress={() => setPeriod('5d')} 
          />
          <GraphButtonWrapper 
            label="1 mes" 
            isActive={period === '1m'} 
            onPress={() => setPeriod('1m')} 
            className="mx-4"
          />
          <GraphButtonWrapper 
            label="6 meses" 
            isActive={period === '6m'} 
            onPress={() => setPeriod('6m')} 
          />
        </View>
      </View>
    </View>
  );
};

export default HistoricalPriceLinegraph;