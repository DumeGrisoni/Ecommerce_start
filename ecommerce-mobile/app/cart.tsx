import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, Icon, RemoveIcon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useCart } from '@/store/cartStore';
import { CartItemType } from '@/types/types';
import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';

export default function CartScreen() {
  const isWeb = Platform.OS === 'web' ? true : false;
  const cartItems: CartItemType[] = useCart((state) => state.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Box
      className={`flex-1 ${isWeb ? 'flex-row justify-center items-center gap-2' : 'flex-col'} `}
    >
      <Stack.Screen options={{ title: 'Mon panier' }} />
      {isWeb ? (
        <Card className="w-[70%] mx-auto h-auto my-10">
          <Text className="font-bold w-full text-center text-xl mb-3">
            Mon panier
          </Text>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <Box
                key={item.product.id}
                className={`flex-row w-full my-3 max-h-[110px] mx-auto h-full p-4 items-center justify-between border-t border-gray-300`}
              >
                <Image
                  source={{
                    uri: item.product.image,
                  }}
                  className="max-h-[100px] max-w-[100px] mr-10 w-full rounded-xl justify-start "
                  alt="Image du produit"
                  resizeMode="contain"
                />
                <Text className="flex-1">{item.product.name}</Text>
                <Text className="flex-1 text-center">{item.product.price}</Text>
                <HStack className="flex-1 justify-center items-center gap-3">
                  <Pressable>
                    <Icon as={RemoveIcon} />
                  </Pressable>
                  <Text className="text-center mx-4">{item.quantity}</Text>
                  <Pressable>
                    <Icon as={AddIcon} />
                  </Pressable>
                </HStack>

                <Text className="text-center flex-1 justify-end items-center">
                  {item.quantity * item.product.price} €
                </Text>
              </Box>
            )}
            className="border-b border-gray-300 "
          />
          <Box className="justify-center mt-6 flex-row">
            <Text className="font-bold text-center text-xl">Sous-total : </Text>
            <Text className=" text-center text-xl ">{total.toFixed(2)} €</Text>
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
                <Text className="flex-1 font-bold">{item.product.name}</Text>
                <Text className="flex-1">{item.product.price}</Text>
              </Box>
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
        <Card className="w-[25%] h-[80%] bg-white mr-6">
          <Box className="flex-row w-full items-center justify-center">
            <Text className="font-bold flex-1 text-xl mb-3">Sous-total : </Text>
            <Text className="font-bold  text-xl mb-3">
              {total.toFixed(2)} €
            </Text>
          </Box>
          <Button className={`h-[50px] rounded-full`}>
            <ButtonText>Continuer votre shopping</ButtonText>
          </Button>
          <Button className={`h-[50px] rounded-full`}>
            <ButtonText>Valider mon panier</ButtonText>
          </Button>
        </Card>
      ) : (
        <Box className="mb-10 w-[50%] mx-auto">
          <Box className="flex-row w-full items-center justify-center">
            <Text className="font-bold flex-1 text-xl mb-3">Sous-total : </Text>
            <Text className="text-xl mb-3">{total.toFixed(2)} €</Text>
          </Box>
          <Button className={`h-[50px] rounded-full`}>
            <ButtonText>Valider mon panier</ButtonText>
          </Button>
        </Box>
      )}
    </Box>
  );
}
