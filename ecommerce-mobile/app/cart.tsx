import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

export default function CartScreen() {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>Cart</Text>
      <StatusBar style="auto" />
    </View>
  );
}
