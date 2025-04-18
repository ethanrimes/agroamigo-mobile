// src/components/ui/data/TrendTicker.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import { useTheme } from '../../../theme/providers/ThemeProvider';

interface TrendTickerProps {
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export const TrendTicker: React.FC<TrendTickerProps> = ({
  value,
  trend
}) => {
  const { theme } = useTheme();
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return theme.colors.action.success;
      case 'down':
        return theme.colors.action.error;
      default:
        return theme.colors.text.tertiary;
    }
  };
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ChevronUp size={16} color={getTrendColor()} />;
      case 'down':
        return <ChevronDown size={16} color={getTrendColor()} />;
      default:
        return null;
    }
  };
  
  const getPrefix = () => {
    switch (trend) {
      case 'up':
        return '+';
      case 'down':
        return '-';
      default:
        return '';
    }
  };
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {getTrendIcon()}
      <Text
        style={{
          color: getTrendColor(),
          fontSize: 14,
          fontWeight: '500'
        }}
      >
        {getPrefix()}{value}
      </Text>
    </View>
  );
};

export default TrendTicker;