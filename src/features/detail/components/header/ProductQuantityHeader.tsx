// src/features/detail/components/header/ProductQuantityHeader.tsx
import React from 'react';
import { View } from 'react-native';
import DetailHeader from './DetailHeader';

interface ProductQuantityHeaderProps {
  productId?: string;
}

/**
 * Product Quantity specific header component
 * Extends the base DetailHeader with quantity-specific content for products
 */
const ProductQuantityHeader: React.FC<ProductQuantityHeaderProps> = ({ 
  productId 
}) => {
  return (
    <DetailHeader title="Cantidad Producto">
      <View>
        {/* Product quantity specific header content will be added later */}
      </View>
    </DetailHeader>
  );
};

export default ProductQuantityHeader;