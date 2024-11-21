// ----------------- Import de Personnels -----------------
import { getProductById } from '@/api/products';
import { Box } from '@/components/ui/box';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { ProductType } from '@/types/types';

export default async function ProductDetails({
  params,
}: {
  params: { id: number };
}) {
  // ----------------- Variables -----------------
  const id = params.id;

  // ----------------- Fonctions -----------------

  const product: ProductType = await getProductById(id);

  // ----------------- Rendu -----------------

  return (
    <Card
      className="rounded-lg lg:max-w-[960px] h-full  justify-center items-center mx-auto my-auto"
      style={{
        height: '100%',
        flex: 1,
        marginHorizontal: 'auto',
        marginVertical: 'auto',
      }}
    >
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
    </Card>
  );
}
