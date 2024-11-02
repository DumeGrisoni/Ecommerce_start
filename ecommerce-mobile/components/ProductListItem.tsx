import React from 'react';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

// ---------------- Imports personnels ---------------
import { Card } from './ui/card';
import { Image } from './ui/image';
import { Heading } from './ui/heading';
import { Text } from './ui/text';

export default function ProductListItem({ product }) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-3 rounded-lg flex-1" variant="elevated">
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[200px] w-full rounded-md"
            alt="Image du produit"
            resizeMode="contain"
          />

          <Text size="md" className=" flex-1">
            {product.name}
          </Text>

          <Heading size="lg" className=" mt-6 font-bold">
            {product.price} €
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
