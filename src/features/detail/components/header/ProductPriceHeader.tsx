// src/features/detail/components/header/ProductPriceHeader.tsx
import React from 'react';
import { View } from 'react-native';
import DetailHeader from './DetailHeader';

interface ProductPriceHeaderProps {
  productId?: string;
}

/**
 * Product Price specific header component
 * Extends the base DetailHeader with price-specific content for products
 */
const ProductPriceHeader: React.FC<ProductPriceHeaderProps> = ({ 
  productId 
}) => {
  return (
    <DetailHeader title="Agro Amigo">
      <View>
        {/* Product price specific header content will be added later */}
      </View>
    </DetailHeader>
  );
};

export default ProductPriceHeader;