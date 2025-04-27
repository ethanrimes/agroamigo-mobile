// src/features/detail/utils/dataTransformers.ts
import { PriceDataPoint } from "../hooks/product/useProductPriceData";
import { RankedListItemProps } from "../components/rankedLists/RankedListItem";

/**
 * Transforms price data points into ranked list items for markets
 * Orders markets by price (lowest to highest)
 */
export const transformMarketsToRankedList = (
  dataPoints: PriceDataPoint[]
): RankedListItemProps[] => {
  if (!dataPoints || dataPoints.length === 0) {
    return [];
  }

  // Sort data points by price (lowest to hgit addighest)
  const sortedDataPoints = [...dataPoints].sort((a, b) => a.price - b.price);

  // Transform to RankedListItemProps
  return sortedDataPoints.map((dataPoint, index) => {
    return {
      rank: index + 1,
      name: dataPoint.marketName,
      value: `${dataPoint.price.toFixed(1)}`,
      date: dataPoint.date ? formatDateString(dataPoint.date) : '',
    };
  });
};

/**
 * Formats a date string from ISO format to a more readable format
 * e.g. "2023-04-01" to "1 abril, 2023"
 */
export const formatDateString = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Handle invalid date
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 
      'mayo', 'junio', 'julio', 'agosto', 
      'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};