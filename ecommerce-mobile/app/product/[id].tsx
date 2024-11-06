import { View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

// ---------------- Imports personnels ---------------
import { Text } from '@/components/ui/text';
import products from '@/assets/products.json';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return (
      <View className=" items-center justify-center">
        <Text className="font-bold text-xl">Ooops! Aucun produit trouvé</Text>
      </View>
    );
  }
  return (
    <Box
      key={product.id + product.name}
      className="flex-1 items-center justify-center p-6"
    >
      <Card className="p-3 rounded-lg max-w-[960px] w-full items-center justify-center flex-1">
        <Stack.Screen options={{ title: product.name }} />
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[300px] w-full rounded-md"
          alt="Image du produit"
          resizeMode="contain"
        />
        <VStack className="mb-6">
          <Heading size="md" className="mb-4 text-center">
            {product.name}
          </Heading>
          <Text size="sm" className="text-center">
            {product.description}
          </Text>
          <Text size="lg" className="text-center mt-6 font-bold">
            {product.price} €
          </Text>
        </VStack>

        <Button className=" mt-3">
          <ButtonText size="sm">Ajouter au panier</ButtonText>
        </Button>
      </Card>
    </Box>
  );
}
