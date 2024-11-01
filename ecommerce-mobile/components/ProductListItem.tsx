import { View, Text } from 'react-native';
import React from 'react';

export default function ProductListItem({ product }) {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>{product.name}</Text>
    </View>
  );
}
