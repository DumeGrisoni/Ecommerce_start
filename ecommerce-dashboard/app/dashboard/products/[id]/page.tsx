'use client';

import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

// ----------------- Import de Personnels -----------------

import { getProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { ProductType } from '@/types/types';
import ImageMagnifier from '@/components/products/ImageMagnifier';

export default function ProductDetails({ params }: { params: { id: number } }) {
  // ----------------- Hooks -----------------

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // ----------------- Fonctions -----------------

  const handleSelectedImage = (index: number) => {
    if (product) {
      setSelectedImage(index);
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
  }, [params.id]);

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
              <Text size="md" className="text-right">
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
              <Text size="md" className="text-right">
                {product.description}
              </Text>
            </HStack>
            <HStack className=" w-[80%] justify-between items-center px-4 mx-auto">
              <Text size="md" className="text-left font-semibold">
                Prix:
              </Text>
              <Text size="md" className="text-right">
                {product.price} €
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </Box>
  );
}
