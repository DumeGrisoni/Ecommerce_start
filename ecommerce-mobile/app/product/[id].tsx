import { ActivityIndicator, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

// ---------------- Imports personnels ---------------
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { getProductById } from '@/api/products';
import { useCart } from '@/store/cartStore';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, Icon, RemoveIcon } from '@/components/ui/icon';
import { useToastNotification } from '@/components/toast';

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
  const [quantity, setQuantity] = useState(1);
  const { showNewToast } = useToastNotification();

  const addToCart = () => {
    addProduct(product, quantity);
    showNewToast({
      title: 'Produit ajouté au panier',
      description: `${quantity} ${product.name} ajouté au panier`,
    });
  };
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // ----------------- Affichage -----------------
  if (isLoading) {
    return (
      <Box className=" flex-1 h-full w-full items-center justify-center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

  if (error) {
    return <Text>Une erreur est survenue lors du chargement du produit.</Text>;
  }

  const height = Dimensions.get('window').height - 60;

  return (
    <SafeAreaView
      key={product.id + product.name}
      className={`flex-1 items-center justify-center w-full h-full`}
    >
      <Box className={`h-full`}>
        <Card className="rounded-lg lg:max-w-[960px] w-[90%] mx-auto items-center justify-center mt-[42px] md:mt-[52px] lg:mt-[60px] ">
          <Stack.Screen options={{ title: product.name }} />
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[300px] w-full rounded-md"
            alt="Image du produit"
            resizeMode="contain"
          />
          <VStack className="mb-1">
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

          <HStack className=" mt-6 mb-6 border p-2 max-w-[120px] w-auto h-auto max-h-[50px] border-black rounded-lg justify-center flex-row items-center gap-3">
            <Pressable
              onPress={decrementQuantity}
              className="flex-1 justify-center items-center h-full"
            >
              <Icon as={RemoveIcon} />
            </Pressable>
            <Text className="text-center mx-2 text-sm md:text-base lg:text-lg">
              {quantity}
            </Text>
            <Pressable
              onPress={incrementQuantity}
              className="flex-1 items-center justify-center"
            >
              <Icon as={AddIcon} />
            </Pressable>
          </HStack>
          <Button className="mb-6" onPress={addToCart}>
            <ButtonText size="sm">Ajouter au panier</ButtonText>
          </Button>
        </Card>
      </Box>
    </SafeAreaView>
  );
}
