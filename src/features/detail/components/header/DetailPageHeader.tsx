// src/features/detail/components/header/DetailPageHeader.tsx
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import BackArrowWrapper from './BackArrowWrapper';
import CurrentPriceDetail from './CurrentPriceDetail';
import CitySelector from './CitySelector';
import FilterButtonWrapper from './FilterButtonWrapper';
import InfoButtonWrapper from './InfoButtonWrapper';
import PriceDetailHeaderFooters from './PriceDetailHeaderFooters';

interface DetailPageHeaderProps {
  data: any;
  type: 'producto' | 'insumo' | 'mercado';
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({ data, type }) => {
  const { colors } = useTheme();
  
  return (
    <View className="w-full bg-primary-default p-4">
      <View className="flex-row justify-between items-center mb-2">
        <BackArrowWrapper />
        <View className="flex-row">
          <InfoButtonWrapper />
          <FilterButtonWrapper />
        </View>
      </View>
      
      <CurrentPriceDetail 
        data={data}
        type={type}
      />
      
      <PriceDetailHeaderFooters data={data} type={type} />
      
      <CitySelector 
        currentCity={data.location?.city || 'Medellín, Antioquia - CMA'} 
      />
    </View>
  );
};

export default DetailPageHeader;