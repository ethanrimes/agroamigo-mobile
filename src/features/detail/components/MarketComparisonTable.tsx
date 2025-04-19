// src/features/detail/components/MarketComparisonTable.tsx
import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import MarketComparisonTableColumnTitles from './market_body_components/MarketComparisonTableColumnTitles';
import MarketComparisonTableSection from './market_body_components/MarketComparisonTableSection';
import { MarketData } from '../hooks/useMarketData';

interface MarketComparisonTableProps {
  marketData: MarketData;
}

// Group products by category for display
const groupProductsByCategory = (products: MarketData['productComparisons']) => {
  const grouped = {
    'Frutas': {
      'Cítricos': products.filter(p => 
        p.productName.toLowerCase().includes('naranja') || 
        p.productName.toLowerCase().includes('limón')),
      'Otras Frutas': products.filter(p => 
        (p.productName.toLowerCase().includes('manzana') || 
        p.productName.toLowerCase().includes('papaya') ||
        p.productName.toLowerCase().includes('piña')) && 
        !p.productName.toLowerCase().includes('naranja') && 
        !p.productName.toLowerCase().includes('limón'))
    },
    'Verduras': {
      'Hortalizas': products.filter(p => 
        p.productName.toLowerCase().includes('tomate') ||
        p.productName.toLowerCase().includes('cebolla') ||
        p.productName.toLowerCase().includes('zanahoria'))
    }
  };
  
  // Only return categories that have items
  return Object.fromEntries(
    Object.entries(grouped)
      .filter(([_, subcategories]) => 
        Object.values(subcategories).some(items => items.length > 0)
      )
  );
};

const MarketComparisonTable: React.FC<MarketComparisonTableProps> = ({ 
  marketData 
}) => {
  const { spacing } = useTheme();
  
  // Group products by category
  const categorizedProducts = useMemo(() => 
    groupProductsByCategory(marketData.productComparisons),
    [marketData.productComparisons]
  );
  
  // Extract main categories from grouped data
  const categories = Object.keys(categorizedProducts);

  return (
    <View className="flex-1 bg-background-primary">
      <View style={{ paddingHorizontal: spacing.spacing.sm }}>
        {/* Table Column Headers */}
        <MarketComparisonTableColumnTitles 
          marketNames={[marketData.name, marketData.priceComparison.referenceMarket]} 
        />
        
        {/* Map through each category to create sections */}
        {categories.map((category, index) => (
          <MarketComparisonTableSection
            key={`category-${index}`}
            categoryName={category}
            categoryData={categorizedProducts[category]}
            marketNames={[marketData.name, marketData.priceComparison.referenceMarket]}
            productsData={marketData.productComparisons}
          />
        ))}
      </View>
    </View>
  );
};

export default MarketComparisonTable;