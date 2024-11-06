import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

// ---------------- Imports personnels ---------------
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { getProductById } from '@/api/products';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading) {
    return (
      <View className=" flex-1 h-full w-full items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>Une erreur est survenue lors du chargement du produit.</Text>;
  }

  return (
    <Box
      key={product.id + product.name}
      className="flex-1 items-center justify-center p-6"
    >
      <Card className="p-3 rounded-lg max-w-[960px] w-full items-center justify-center flex-1">
        <Stack.Screen
          options={{ title: product.name, headerTitleAlign: 'center' }}
        />
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
