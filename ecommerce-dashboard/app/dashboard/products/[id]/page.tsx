'use client';

import { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

// ----------------- Import de Personnels -----------------

import { deleteProduct, getProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { CategoryProps, ProductWithVariant } from '@/types/types';
import ImageMagnifier from '@/components/products/ImageMagnifier';
import { listCategories } from '@/api/categories';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { EditIcon, TrashIcon } from '@/components/ui/icon';
import { removeImage } from '@/utils/removeImage';
import { useToastNotification } from '@/components/toast';

export default function ProductDetails({ params }: { params: { id: number } }) {
  // ----------------- Hooks -----------------

  const [product, setProduct] = useState<ProductWithVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [productCategories, setProductCategories] = useState<CategoryProps[]>(
    []
  );
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const toast = useToastNotification();

  // ----------------- Fonctions -----------------

  const handleSelectedImage = (index: number) => {
    if (product) {
      setSelectedImage(index);
    }
  };

  const filterCategories = useCallback(() => {
    // Retrouver toutes les categories qui correspondent au produit
    if (product && product.categoryId) {
      const productCategories = categories.filter((category) =>
        product?.categoryId.includes(category.id.toString())
      );
      setProductCategories(productCategories);
    }
  }, [categories, product]);

  const handleDeleteProduct = async () => {
    if (product) {
      const confirmDelete = window.confirm(
        'Êtes-vous sûr de vouloir supprimer ce produit ?'
      );
      if (confirmDelete) {
        try {
          // Supprimer les images du produit
          for (const img of product.image) {
            const imgPath = img.replace('https://utfs.io/f/', '');
            await removeImage(imgPath);
          }
          // Supprimer le produit
          await deleteProduct(product.id.toString());
          toast.showNewToast({
            title: 'Suppression',
            description: 'Le produit a été supprimé avec succès',
          });
        } catch (error) {
          console.error('Erreur lors de la suppression du produit:', error);
        }
      }
    }
  };

  // ----------------- Effects -----------------

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(params.id);
      setProduct(fetchedProduct);
      setSelectedImage(0);
    };

    fetchProduct();

    const fetchCategories = async () => {
      const data = await listCategories();
      setCategories(data);
    };

    fetchCategories();
  }, [params.id]);

  useEffect(() => {
    if (categories.length > 0 && product) {
      filterCategories();
    }
  }, [categories, product, filterCategories]);

  // ----------------- Rendu -----------------

  if (!product) {
    return (
      <Box className="flex-1 justify-center items-center my-auto min-h-screen">
        <Heading>Produit introuvable</Heading>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen flex-1 z-0 justify-center items-center "
      key={product.id}
    >
      <Card className="max-w-screen-xl z-0 border justify-center items-center w-full mx-auto">
        <VStack
          className="flex-1 relative z-0 w-full justify-center items-center flex-col lg:flex-row"
          space="xl"
        >
          {Array.isArray(product.image) && (
            <VStack className=" w-full justify-center items-center" space="lg">
              <ImageMagnifier imageUrl={product.image[selectedImage]} />

              <HStack
                className=" w-full justify-center items-center"
                space="lg"
              >
                {product.image.map((img, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleSelectedImage(index)}
                    className={`border border-slate-500 border-opacity-0 cursor-pointer hover:border-opacity-100 ${
                      selectedImage === index && 'border-opacity-100'
                    } rounded-md my-2`}
                  >
                    <Image
                      source={{
                        uri: img,
                      }}
                      className={`h-[100px] w-[100px] rounded-md`}
                      alt="Image du produit"
                      resizeMode="cover"
                    />
                  </Pressable>
                ))}
              </HStack>
            </VStack>
          )}
          <Box className=" w-[90%] lg:w-[1px] z-0 mx-auto lg:my-auto h-[1px] lg:h-[90%] bg-typography-100 my-3 " />
          <VStack className="z-0 justify-center items-center w-full" space="lg">
            <HStack className=" w-[80%] justify-between items-center px-4 mx-auto">
              <Text size="md" className="text-left font-semibold">
                Nom du produit:
              </Text>
              <Text size="md" className="text-right font-semibold">
                {product.name}
              </Text>
            </HStack>
            <HStack
              className=" w-[80%] justify-between items-start px-4 mx-auto"
              space="sm"
            >
              <Text size="md" className="text-left font-semibold">
                Description:
              </Text>

              <VStack>
                {product.description.map((desc, index) => {
                  const [beforeColon, afterColon] = desc.split(':');
                  return (
                    <>
                      <Text size="md" key={index} className="text-right">
                        <Text className="font-semibold">{beforeColon}</Text>
                        {afterColon && `:${afterColon}`}
                      </Text>
                      <Box className="w-full h-[1px] bg-typography-200 my-2" />
                    </>
                  );
                })}
              </VStack>
            </HStack>
            <HStack className=" w-[80%] justify-between items-center px-4 mx-auto">
              <Text size="md" className="text-left font-semibold">
                Prix:
              </Text>
              <Text size="md" className="text-right font-semibold">
                {product.price} €
              </Text>
            </HStack>
            <HStack className=" w-[80%] justify-between items-center px-4 mx-auto">
              <Text size="md" className="text-left font-semibold">
                Categories:
              </Text>
              {productCategories.length > 0 && (
                <HStack space="md" className="text-right">
                  {productCategories.map((category, index) => (
                    <Text
                      key={index}
                      size="md"
                      className="text-center text-typography-white bg-typography-900 border border-typography-white rounded-md p-2"
                    >
                      {category.name}
                    </Text>
                  ))}
                </HStack>
              )}
            </HStack>
            <VStack className=" w-[80%] justify-between items-start px-4 mx-auto">
              <Text size="md" className="text-left font-semibold">
                Couleurs et tailles (en stock) :
              </Text>
              <Box className="w-full h-[1px] bg-typography-200 mt-2 mb-4" />

              {product.variant &&
                product.variant.colors &&
                product.variant.colors.map((color, index) => (
                  <HStack space="md" key={index} className="ml-3">
                    <Text size="md" className="text-left font-semibold ">
                      {color.name} :{' '}
                    </Text>

                    {color && (
                      <VStack key={index} space="md" className="">
                        {color.sizes.map((size, index) => (
                          <HStack key={index} space="md" className=" w-full">
                            <Text
                              key={index}
                              size="md"
                              className="text-left font-semibold"
                            >
                              {size.size} :
                            </Text>
                            <Text
                              key={index}
                              size="md"
                              className="text-center flex-1"
                            >
                              {size.stock}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                  </HStack>
                ))}
            </VStack>
            <HStack
              space="xl"
              className=" justify-center items-center w-full mt-20 mx-auto"
            >
              <Button>
                <ButtonIcon
                  as={EditIcon}
                  onPress={() => setModifyModalVisible(!modifyModalVisible)}
                />
                <ButtonText>Modifier</ButtonText>
              </Button>
              <Button action="negative" onPress={handleDeleteProduct}>
                <ButtonIcon as={TrashIcon} />
                <ButtonText>Supprimer</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modifyModalVisible}
        onRequestClose={() => {
          setModifyModalVisible(!modifyModalVisible);
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
          <Box className="flex-1 h-full justify-center items-center my-auto">
            <Heading>Modifier le produit</Heading>
          </Box>
        </View>
      </Modal>
    </Box>
  );
}
