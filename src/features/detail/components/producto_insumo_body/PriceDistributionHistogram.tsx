// src/features/detail/components/producto_insumo_body/PriceDistributionHistogram.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceDistributionHistogramProps {
  data: number[];
}

const PriceDistributionHistogram: React.FC<PriceDistributionHistogramProps> = ({ data }) => {
  // Find the maximum value for scaling
  const maxValue = Math.max(...data);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return '$' + value.toLocaleString('es-CO');
  };

  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold mb-4">Distribución de Precios</Text>
      
      <View className="bg-white p-4 rounded-lg">
        {/* Histogram container */}
        <View className="flex-row justify-between h-120 items-end mb-2">
          {data.map((value, index) => {
            // Calculate bar height as percentage of max value (max height 100)
            const barHeight = (value / maxValue) * 100;
            
            return (
              <View 
                key={index} 
                className="flex-1 mx-0.5 items-center"
              >
                <View 
                  style={{ height: barHeight }} 
                  className={`w-full ${index === 6 ? 'bg-primary-default' : 'bg-gray-200'}`} 
                />
              </View>
            );
          })}
        </View>
        
        {/* Legend */}
        <View className="flex-row justify-between mt-2">
          <Text style={{
            fontFamily: 'Inter',
            fontSize: 10,
            lineHeight: 12,
            fontWeight: '500' as const, // Specify the correct type
            letterSpacing: 0.5,
          }} className="text-gray-500">
            {formatCurrency(Math.min(...data))}
          </Text>
          <Text style={{
            fontFamily: 'Inter',
            fontSize: 10,
            lineHeight: 12,
            fontWeight: '500' as const, // Specify the correct type
            letterSpacing: 0.5,
          }} className="text-gray-500">
            {formatCurrency(Math.max(...data))}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PriceDistributionHistogram;