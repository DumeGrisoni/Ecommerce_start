import { ActivityIndicator, Alert, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

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
import { useCart } from '@/store/cartStore';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';

export default function ProductDetailScreen() {
  // ----------------- Récupération de l'id du produit -----------------
  const { id } = useLocalSearchParams<{ id: string }>();

  // ----------------- Récupération du produit -----------------

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(Number(id)),
  });

  // ----------------- Fonction Panier -----------------

  const addProduct = useCart((state) => state.addProduct);

  const addToCart = () => {
    addProduct(product);
    if (isWeb) {
      alert('Votre produit a bien été ajouté au panier');
    } else {
      return Alert.alert(
        'Produit ajouté au panier',
        'Votre produit a bien été ajouté au panier'
      );
    }
  };

  // ----------------- Affichage -----------------
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

        <Button className=" mt-3" onPress={addToCart}>
          <ButtonText size="sm">Ajouter au panier</ButtonText>
        </Button>
      </Card>
    </Box>
  );
}
