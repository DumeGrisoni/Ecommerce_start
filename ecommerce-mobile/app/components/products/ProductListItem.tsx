import { View, Text } from 'react-native';
import React from 'react';

import { ProductType } from '../../../types/type';

const ProductListItem = (product: ProductType) => {
  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  );
};

export default ProductListItem;
