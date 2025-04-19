// src/features/detail/components/market_body_components/MarketComparisonTableSection.tsx
import React, { useState, useMemo } from 'react';
import { View } from 'react-native';
import MarketComparisonMajorCategoryHeader from '@/src/features/detail/components/market_body_components/MarketComparisonMajorcategoryHeader';
import MarketComparisonSubcategoryHeader from '@/src/features/detail/components/market_body_components/MarketCo';
import MarketComparisonTableEntry from './MarketComparisonTableEntry';
import TableVerMas from './TableVerMas';
import TableExpanding from '@/src/components/animations/TableExpanding';
import { MarketData } from '../../hooks/useMarketData';

interface MarketComparisonTableSectionProps {
  categoryName: string;
  categoryData: Record<string, MarketData['productComparisons']>;
  marketNames: string[];
  productsData: MarketData['productComparisons'];
}

const MarketComparisonTableSection: React.FC<MarketComparisonTableSectionProps> = ({
  categoryName,
  categoryData,
  marketNames,
  productsData
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Get subcategories
  const subcategories = Object.keys(categoryData);
  
  // Calculate the total difference percentage for this category
  const calculateTotalDifference = useMemo(() => {
    let totalDiffPercentage = 0;
    let count = 0;
    
    subcategories.forEach(sub => {
      categoryData[sub].forEach((item) => {
        if (item.difference) {
          totalDiffPercentage += item.difference;
          count++;
        }
      });
    });
    
    return count > 0 ? `${(totalDiffPercentage / count).toFixed(1)}%` : '0%';
  }, [categoryData, subcategories]);

  // Always show the first subcategory
  const firstSubcategory = subcategories[0];
  
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  // Don't render if no data
  if (subcategories.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      {/* Major Category Header */}
      <MarketComparisonMajorCategoryHeader 
        title={categoryName} 
        diffPercentage={calculateTotalDifference} 
      />
      
      {/* First subcategory is always displayed */}
      {firstSubcategory && (
        <View>
          {/* Subcategory Header */}
          <MarketComparisonSubcategoryHeader title={firstSubcategory} />
          
          {/* Map through items in first subcategory */}
          {categoryData[firstSubcategory].map((product, itemIndex) => (
            <MarketComparisonTableEntry
              key={`item-${product.productId}-${itemIndex}`}
              product={product}
            />
          ))}
        </View>
      )}
      
      {/* Additional subcategories shown when expanded */}
      {subcategories.length > 1 && (
        <TableExpanding expanded={expanded}>
          {subcategories.slice(1).map((subcategory, subIndex) => (
            <View key={`subcategory-${subIndex + 1}`}>
              {/* Subcategory Header */}
              <MarketComparisonSubcategoryHeader title={subcategory} />
              
              {/* Map through items in this subcategory */}
              {categoryData[subcategory].map((product, itemIndex) => (
                <MarketComparisonTableEntry
                  key={`item-${product.productId}-${itemIndex}`}
                  product={product}
                />
              ))}
            </View>
          ))}
        </TableExpanding>
      )}
      
      {/* Show "Ver más" button if there's more than one subcategory */}
      {subcategories.length > 1 && (
        <TableVerMas 
          expanded={expanded} 
          onPress={handleExpand} 
        />
      )}
    </View>
  );
};

export default MarketComparisonTableSection;