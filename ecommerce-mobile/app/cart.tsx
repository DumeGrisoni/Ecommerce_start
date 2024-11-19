import { FlatList, Modal, Platform, Pressable, View } from 'react-native';
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
import { useAuth } from '@/store/authStore';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { truncateText } from '@/utils/truncateText';
import { useToastNotification } from '@/components/toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';

export default function CartScreen() {
  // ------------------Hooks------------------

  const [modalVisible, setModalVisible] = React.useState(false);

  const cartItems: CartItemType[] = useCart((state) => state.items);

  const { showNewToast } = useToastNotification();

  const resetCart = useCart((state: CartStateType) => state.resetCart);

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      ),

    onSuccess: () => {
      resetCart();
      showNewToast({
        title: 'Commande validée',
        description: 'Votre commande a bien été validée',
      });
    },
    onError: (error) => {
      console.log(error);
      showNewToast({
        title: 'Erreur',
        description:
          'Une erreur est survenue lors de la validation de la commande',
      });
    },
  });

  const isLoggedIn = useAuth((state) => !!state.token);

  // ------------------Variables------------------

  const router = useRouter();

  const isWeb = Platform.OS === 'web' ? true : false;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ------------------Fonctions------------------

  const checkOut = async () => {
    if (isLoggedIn) {
      createOrderMutation.mutate();
    } else {
      setModalVisible(true);
    }
  };

  const goToLogin = () => {
    router.dismissAll();
    router.replace('/login');
  };

  const backToHome = () => {
    router.replace('/');
    router.dismissAll();
  };

  const removeProduct = useCart((state: CartStateType) => state.removeProduct);

  const removeToCart = (productId: number) => {
    removeProduct(productId);
    showNewToast({
      title: 'Produit retiré du panier',
      description: 'Le produit a été retiré du panier',
    });
  };
  const incrementQuantity = useCart(
    (state: CartStateType) => state.incrementQuantity
  );

  const decrementQuantity = useCart(
    (state: CartStateType) => state.decrementQuantity
  );

  // ------------------Rendu------------------

  if (totalQuantity === 0) {
    return (
      <SafeAreaView className="flex-1">
        <Card className="lg:w-[70%] w-[90%] mx-auto h-auto my-10  ">
          <Text className="font-bold w-full text-center text-xl mb-3">
            Mes Articles
          </Text>
          <Text className="my-10 mx-auto">Votre panier est vide</Text>
          <Button
            className={`md:h-[50px] md:rounded-lg ${isWeb ? 'w-[30%]' : 'w-[70%]'}  mx-auto`}
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center my-auto h-full w-full ">
      <Box
        className={` ${isWeb ? 'lg:flex-row justify-center h-full w-full items-center md:gap-2' : 'mt-2 mb-10 h-full flex-col'} `}
      >
        {isWeb ? (
          <Card className="lg:w-[70%] w-[90%] mx-auto h-auto my-10">
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
                    <Pressable
                      onPress={() => decrementQuantity(item.product.id)}
                    >
                      <Icon as={RemoveIcon} />
                    </Pressable>
                    <Text className="text-center mx-4 text-sm md:text-base lg:text-lg">
                      {item.quantity}
                    </Text>
                    <Pressable
                      onPress={() => incrementQuantity(item.product.id)}
                    >
                      <Icon as={AddIcon} />
                    </Pressable>
                  </HStack>

                  <Text className="text-center text-sm lg:text-base flex-1">
                    {item.quantity * item.product.price} €
                  </Text>
                  <Pressable
                    onPress={() => removeToCart(item.product.id)}
                    className="mr-4"
                  >
                    <Icon as={Trash2} />
                  </Pressable>
                </Box>
              )}
              className="border-b border-gray-300 "
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
          <Box className=" mt-auto ">
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
                      {truncateText(item.product.name, 20)}
                    </Text>
                    <Text className="flex-1">{item.product.price}</Text>
                  </Box>
                  <HStack className="flex-1 ml-1 justify-center flex-row items-center gap-1 ">
                    <Pressable
                      onPress={() => decrementQuantity(item.product.id)}
                    >
                      <Icon as={RemoveIcon} />
                    </Pressable>
                    <Text className="text-center mx-2 text-sm md:text-base lg:text-lg">
                      {item.quantity}
                    </Text>
                    <Pressable
                      onPress={() => incrementQuantity(item.product.id)}
                    >
                      <Icon as={AddIcon} />
                    </Pressable>
                  </HStack>

                  <Box className=" items-center justify-center mr-3">
                    <Text className="text-center">
                      {item.quantity * item.product.price} €
                    </Text>
                  </Box>
                  <Pressable
                    className=" mr-2 justify-center items-center"
                    onPress={() => removeToCart(item.product.id)}
                  >
                    <Icon as={Trash2} />
                  </Pressable>
                </Card>
              )}
              className="my-6"
            />
          </Box>
        )}

        {isWeb ? (
          <Card className="lg:w-[25%] w-[90%] lg:h-[80%] bg-white md:mr-6">
            <Box className="lg:flex-row flex-col w-full items-center justify-center">
              <Text className="font-bold flex-1 text-center lg:text-left md:text-lg lg:text-xl mb-3">
                Sous-total : ({totalQuantity}{' '}
                {totalQuantity > 1 ? 'articles' : 'article'})
              </Text>
              <Text className="font-bold text-base md:text-lg lg:text-xl md:mb-3">
                {total.toFixed(2)} €
              </Text>
            </Box>
            <Box className="gap-6 mt-5 md:mt-10">
              <Button
                className={`md:h-[50px] md:rounded-lg w-[70%] mx-auto`}
                onPress={backToHome}
              >
                <ButtonText
                  adjustsFontSizeToFit
                  allowFontScaling
                  maxFontSizeMultiplier={0}
                  className="text-center text-sm lg:text-base"
                >
                  Continuer mes achats
                </ButtonText>
              </Button>
              {totalQuantity === 0 ? null : (
                <Button
                  className={`md:h-[50px] md:rounded-lg w-[70%] mx-auto`}
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
          <Box className="pb-16 w-[90%] mx-auto mt-auto border-t border-gray-300">
            <Box className="flex-col mb-2 mt-3 w-full items-center justify-center">
              <HStack className="flex-row items-center justify-center gap-2">
                <Text className="font-bold text-xl mb-2"> Sous-total :</Text>
                <Text className="text-xl mb-2">
                  ({totalQuantity} {totalQuantity > 1 ? 'articles' : 'article'})
                </Text>
              </HStack>
              <Text className="text-xl mb-2">{total.toFixed(2)} €</Text>
            </Box>
            <Box className="gap-3">
              {totalQuantity === 0 ? null : (
                <Button
                  className={`h-[50px] mt-3 w-[70%] mx-auto rounded-lg`}
                  onPress={checkOut}
                >
                  <ButtonText>Valider mon panier</ButtonText>
                </Button>
              )}
              <Button
                className={`h-[50px] mt-3 w-[70%] mx-auto rounded-lg`}
                onPress={backToHome}
              >
                <ButtonText>Continuer mes achats</ButtonText>
              </Button>
            </Box>
          </Box>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          className="flex-1 items-center justify-center"
        >
          <Box
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
            className="flex-1"
          >
            <Card className="bg-white w-[80%] md:w-[50%] lg:w-[30%] max-h-[50%] h-auto mx-auto my-auto justify-center items-center">
              <VStack space="xl" className="p-4 items-center justify-center">
                <Heading>Confirmation du panier</Heading>
                <Text className="text-center">
                  Vous devez être connecté pour valider votre panier
                </Text>
                <VStack space="md" className={`mt-auto gap-4`}>
                  <Button onPress={goToLogin} size="lg" className="rounded-lg">
                    <ButtonText>Me connecter</ButtonText>
                  </Button>
                  <Button onPress={backToHome} size="lg" className="rounded-lg">
                    <ButtonText>Continuer mes achats</ButtonText>
                  </Button>
                </VStack>
              </VStack>
            </Card>
          </Box>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}
