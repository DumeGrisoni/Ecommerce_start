'use client';
import { Link } from 'expo-router';
import { Platform, Pressable } from 'react-native';

// ---------------- Imports personnels ---------------
import { Card } from './ui/card';
import { Image } from './ui/image';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { ProductType, ProductWithVariant } from '@/types/types';
import { HStack } from './ui/hstack';
import { useEffect, useState } from 'react';

// ---------------- Types ---------------

const isWeb = Platform.OS === 'web' ? true : false;

export default function ProductListItem({
  product,
}: {
  product: ProductWithVariant;
}) {
  //---------Hooks-----------
  const [checkStock, setCheckStock] = useState(false);
  //---------Functions-----------

  const checkAvailableProducts = (product: ProductWithVariant) => {
    // Vérifier si tous les stocks des variants sont à 0
    const allStocksZero = product.variant.colors.every((color) =>
      color.sizes.every((size) => size.stock === 0)
    );
    setCheckStock(!allStocksZero);
  };

  //---------Effects-----------
  useEffect(() => {
    checkAvailableProducts(product);
  }, [product]);
  //------------Render---------------

  return (
    <Link href={`/product/${product.id}`} key={product.id} asChild>
      <Pressable className="flex-1" key={product.id + product.name}>
        <Card
          className={`${isWeb && 'hover:border-slate-400 border-2 border-transparent'} p-3 rounded-lg flex-1`}
        >
          <Image
            source={{
              uri: product.image[0],
            }}
            className="mb-6 h-[200px] w-full rounded-md"
            alt="Image du produit"
            resizeMode="contain"
          />
          <Text size="md" className="flex-1 text-left">
            {product.name}
          </Text>
          <HStack className="justify-between items-center">
            <Heading size="lg" className="mt-2 font-bold">
              {product.price} €
            </Heading>
            {checkStock ? (
              <Text size="sm" className="text-gray-500 font-normal">
                En stock
              </Text>
            ) : (
              <Text size="sm" className="text-red-500 font-normal">
                Rupture de stock
              </Text>
            )}
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
}
