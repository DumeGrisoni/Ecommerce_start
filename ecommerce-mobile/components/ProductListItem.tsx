import React from 'react';
import { Card } from './ui/card';
import { Image } from './ui/image';
import { VStack } from './ui/vstack';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Box } from './ui/box';
import { Button, ButtonText } from './ui/button';

export default function ProductListItem({ product }) {
  return (
    <Card className="p-5 rounded-lg max-w-full flex-1" variant="elevated">
      <Image
        source={{
          uri: product.image,
        }}
        className="mb-6 h-[240px] w-full rounded-md"
        alt="Image du produit"
        resizeMode="contain"
      />
      <VStack className="mb-6">
        <Heading size="md" className="mb-4 text-center flex-1">
          {product.name}
        </Heading>
        <Text size="sm" className="text-center flex-1">
          {product.description}
        </Text>
        <Text size="lg" className="text-center mt-6 font-bold">
          {product.price} €
        </Text>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
          <ButtonText size="sm">Ajouter au panier</ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
