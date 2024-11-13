import { FlatList, Platform, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Trash2 } from 'lucide-react-native';

// ------------------Imports Personnel------------------

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, Icon, RemoveIcon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useCart } from '@/store/cartStore';
import { CartItemType, CartStateType } from '@/types/types';

export default function CartScreen() {
  const router = useRouter();
  // Vérifier si l'application est en mode web
  const isWeb = Platform.OS === 'web' ? true : false;

  // Récupérer les éléments du panier
  const cartItems: CartItemType[] = useCart((state) => state.items);
  // Mettre le panier a zéro
  const resetCart = useCart((state: CartStateType) => state.resetCart);
  // Ajouter une quantité d'un produit au panier
  const incrementQuantity = useCart(
    (state: CartStateType) => state.incrementQuantity
  );
  // Enlever une quantité d'un produit au panier
  const decrementQuantity = useCart(
    (state: CartStateType) => state.decrementQuantity
  );
  // Enlever un produit du panier
  const removeProduct = useCart((state: CartStateType) => state.removeProduct);

  // Calculer le prix total du panier
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ------------------Fonctions------------------

  const checkOut = async () => {
    resetCart();
  };

  const backToHome = () => {
    router.push('/');
  };

  const removeToCart = (productId: number) => {
    removeProduct(productId);
  };

  // ------------------Rendu------------------

  if (cartItems.length === 0) {
    return (
      <Card className="lg:w-[70%] w-[90%] mx-auto h-auto my-10  ">
        <Text className="font-bold w-full text-center text-xl mb-3">
          Mes Articles
        </Text>
        <Text className="my-10 mx-auto">Votre panier est vide</Text>
        <Button
          className={`md:h-[50px] md:rounded-full ${isWeb ? 'w-[30%]' : 'w-[70%]'}  mx-auto`}
          onPress={backToHome}
        >
          <ButtonText
            adjustsFontSizeToFit
            allowFontScaling
            maxFontSizeMultiplier={0}
            className="text-center text-sm lg:text-base"
          >
            Continuer votre shopping
          </ButtonText>
        </Button>
      </Card>
    );
  }

  return (
    <Box
      className={`flex-1 ${isWeb ? 'lg:flex-row justify-center items-center md:gap-2' : 'flex-col'} `}
    >
      <Stack.Screen options={{ title: 'Mon panier' }} />
      {isWeb ? (
        <Card className="lg:w-[70%] w-[90%] mx-auto h-auto my-10  ">
          <Text className="font-bold w-full text-center text-xl mb-3">
            Mes Articles
          </Text>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <Box
                key={item.product.id}
                className={`flex-row w-full gap-2 my-3 max-h-[110px]  mx-auto h-full md:p-4 items-center justify-between border-t border-gray-300`}
              >
                <Image
                  source={{
                    uri: item.product.image,
                  }}
                  className="lg:max-h-[100px] lg:max-w-[100px] max-h-[30px]  max-w-[30px] mr-10 w-full rounded-xl justify-start "
                  alt="Image du produit"
                  resizeMode="contain"
                />
                <Text className="flex-1 text-sm lg:text-xl md:text-lg">
                  {item.product.name}
                </Text>
                <Text className="hidden lg:block flex-1 text-center text-sm md:text-base">
                  {item.product.price}
                </Text>
                <HStack className="flex-1 mt-3 lg:mt-2 justify-center flex-col md:flex-row items-center gap-1 md:gap-3">
                  <Pressable onPress={() => decrementQuantity(item.product.id)}>
                    <Icon as={RemoveIcon} />
                  </Pressable>
                  <Text className="text-center mx-4 text-sm md:text-base lg:text-lg">
                    {item.quantity}
                  </Text>
                  <Pressable onPress={() => incrementQuantity(item.product.id)}>
                    <Icon as={AddIcon} />
                  </Pressable>
                </HStack>
                <Pressable onPress={() => removeToCart(item.product.id)}>
                  <Icon as={Trash2} />
                </Pressable>

                <Text className="text-center text-sm lg:text-base flex-1">
                  {item.quantity * item.product.price} €
                </Text>
              </Box>
            )}
            className="border-b border-gray-300 "
            ListEmptyComponent={
              <Card className="lg:w-[70%] w-[90%] mx-auto h-auto my-10  ">
                <Text className="font-bold w-full text-center text-xl mb-3">
                  Mes Articles
                </Text>
                <Text className="my-10 mx-auto">Votre panier est vide</Text>
                <Button
                  className={`md:h-[50px] md:rounded-full ${isWeb ? 'w-[30%]' : 'w-[70%]'}  mx-auto`}
                  onPress={backToHome}
                >
                  <ButtonText
                    adjustsFontSizeToFit
                    allowFontScaling
                    maxFontSizeMultiplier={0}
                    className="text-center text-sm lg:text-base"
                  >
                    Continuer votre shopping
                  </ButtonText>
                </Button>
              </Card>
            }
          />
          <Box className="justify-center mt-6 flex-col lg:flex-row">
            <Text className="font-bold text-center text-sm md:text-xl">
              Sous-total :{' '}
            </Text>
            <Text className=" text-center text-sm lg:text-xl ">
              {total.toFixed(2)} €
            </Text>
          </Box>
        </Card>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <Card
              key={item.product.id}
              className={`flex-row px-4 my-2 mx-2 h-auto items-center justify-center bg-white rounded-xl`}
            >
              <Image
                source={{
                  uri: item.product.image,
                }}
                className={`${isWeb ? 'max-h-[100px] max-w-[100px] mr-10' : 'max-h-[50px] max-w-[50px] mr-3'} w-full rounded-xl justify-start `}
                alt="Image du produit"
                resizeMode="contain"
              />
              <Box className="flex-1 ml-2">
                <Text className="flex-1 tex-center font-bold">
                  {item.product.name}
                </Text>
                <Text className="flex-1">{item.product.price}</Text>
              </Box>
              <HStack className="flex-1  justify-center flex-row items-center gap-1 ">
                <Pressable onPress={() => decrementQuantity(item.product.id)}>
                  <Icon as={RemoveIcon} />
                </Pressable>
                <Text className="text-center mx-4 text-sm md:text-base lg:text-lg">
                  {item.quantity}
                </Text>
                <Pressable onPress={() => incrementQuantity(item.product.id)}>
                  <Icon as={AddIcon} />
                </Pressable>
              </HStack>
              <Pressable
                className="flex-1 justify-center items-center"
                onPress={() => removeToCart(item.product.id)}
              >
                <Icon as={Trash2} />
              </Pressable>
              <Box className=" items-center justify-center mr-2">
                <Text className="text-center">
                  {item.quantity * item.product.price} €
                </Text>
              </Box>
            </Card>
          )}
          className="flex-1 my-3"
        />
      )}

      {isWeb ? (
        <Card className="lg:w-[25%] w-[90%] lg:h-[80%] bg-white md:mr-6">
          <Box className="lg:flex-row flex-col w-full items-center justify-center">
            <Text className="font-bold flex-1 text-center lg:text-left md:text-lg lg:text-xl mb-3">
              Sous-total : ({cartItems.length}{' '}
              {cartItems.length > 1 ? 'articles' : 'article'})
            </Text>
            <Text className="font-bold text-base md:text-lg lg:text-xl md:mb-3">
              {total.toFixed(2)} €
            </Text>
          </Box>
          <Box className="gap-2 mt-5 md:mt-10">
            <Button
              className={`md:h-[50px] md:rounded-full w-[70%] mx-auto`}
              onPress={backToHome}
            >
              <ButtonText
                adjustsFontSizeToFit
                allowFontScaling
                maxFontSizeMultiplier={0}
                className="text-center text-sm lg:text-base"
              >
                Continuer votre shopping
              </ButtonText>
            </Button>
            {cartItems.length === 0 ? null : (
              <Button
                className={`md:h-[50px] md:rounded-full w-[70%] mx-auto`}
                onPress={checkOut}
              >
                <ButtonText
                  adjustsFontSizeToFit
                  allowFontScaling
                  maxFontSizeMultiplier={0}
                  className="text-center  text-sm lg:text-base"
                >
                  Valider mon panier
                </ButtonText>
              </Button>
            )}
          </Box>
        </Card>
      ) : (
        <Box className="mb-10 w-[90%] mx-auto border-t border-gray-300">
          <Box className="flex-col mb-2 mt-3 w-full items-center justify-center">
            <HStack className="flex-row items-center justify-center gap-2">
              <Text className="font-bold text-xl mb-2"> Sous-total :</Text>
              <Text className="text-xl mb-2">
                ({cartItems.length}{' '}
                {cartItems.length > 1 ? 'articles' : 'article'})
              </Text>
            </HStack>
            <Text className="text-xl mb-2">{total.toFixed(2)} €</Text>
          </Box>
          <Box className="gap-3">
            {cartItems.length === 0 ? null : (
              <Button
                className={`h-[50px] mt-3 w-[70%] mx-auto rounded-full`}
                onPress={checkOut}
              >
                <ButtonText>Valider mon panier</ButtonText>
              </Button>
            )}
            <Button
              className={`h-[50px] mt-3 w-[70%] mx-auto rounded-full`}
              onPress={backToHome}
            >
              <ButtonText>Continuer votre shopping</ButtonText>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
