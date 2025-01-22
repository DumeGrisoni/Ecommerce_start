import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

// ---------------- Imports personnels ---------------
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Box } from '@/components/ui/box';
import { getProductById } from '@/api/products';
import { useCart } from '@/store/cartStore';
import { HStack } from '@/components/ui/hstack';
import {
  AddIcon,
  CloseCircleIcon,
  Icon,
  RemoveIcon,
} from '@/components/ui/icon';
import { useToastNotification } from '@/components/toast';
import ImageMagnifier from '@/components/ImageMagnifier';
import { ProductType } from '@/types/types';
import { ScanEye } from 'lucide-react-native';

export default function ProductDetailScreen() {
  // ----------------- Récupération de l'id du produit -----------------
  const { id } = useLocalSearchParams<{ id: string }>();

  // ----------------- Récupération du produit -----------------

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<ProductType>({
    queryKey: ['product', id],
    queryFn: () => getProductById(Number(id)),
  });

  // ----------------- Fonction Panier -----------------

  const addProduct = useCart((state) => state.addProduct);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { showNewToast } = useToastNotification();

  const addToCart = () => {
    if (!product) return;
    addProduct(product, quantity);
    showNewToast({
      title: 'Produit',
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

  if (error || !product) {
    return <Text>Une erreur est survenue lors du chargement du produit.</Text>;
  }

  return (
    <SafeAreaView
      className="h-full w-full relative"
      key={product.id + product.name}
      style={styles.safeArea}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Box className={`h-full w-full mt-6 relative`}>
          <Card className="rounded-lg relative h-full lg:max-w-[960px] w-[90%] mx-auto items-center justify-center my-auto md:mt-[52px] lg:mt-[60px] ">
            <Stack.Screen options={{ title: product.name }} />
            <View className="w-full relative h-[50%] items-center mb-3 justify-center">
              <Image
                source={{ uri: product.image[selected] }}
                alt="Image du produit"
                resizeMode="contain"
                className="w-full h-[300px]"
              />
              <Button
                onPress={() => setModalVisible(true)}
                style={{ ...styles.modalButton }}
                action={modalVisible ? 'secondary' : 'primary'}
              >
                <ButtonIcon as={ScanEye} />
              </Button>
            </View>
            <HStack className="" space="sm">
              {product.image.map((image, index) => (
                <Pressable onTouchStart={() => setSelected(index)} key={index}>
                  <Image
                    key={index}
                    source={{ uri: image }}
                    className={`h-[100px] w-[100px] rounded-md ${selected === index && 'border border-slate-400'}`}
                    resizeMode="contain"
                    alt="Images du produit"
                  />
                </Pressable>
              ))}
            </HStack>

            <VStack className="mb-1 mt-4" space="xs">
              <Heading size="xl" className=" text-center">
                {product.name}
              </Heading>
              <Text size="lg" className="text-center font-bold">
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
            <VStack className="w-full mb-5" space="xs">
              <Heading size="lg" className="text-center">
                Description
              </Heading>
              <Text size="md" className="text-center">
                {product.description}
              </Text>
            </VStack>
          </Card>
        </Box>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="flex-1"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <ImageMagnifier imageUrl={product.image[selected]} />
          <Button
            size="xl"
            style={styles.toggleButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <ButtonIcon as={CloseCircleIcon} size="xl" />
          </Button>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    minHeight: Dimensions.get('window').height,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  modalButton: {
    position: 'absolute',
    bottom: 30,
    right: 16,
  },
  toggleButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
  },
});
