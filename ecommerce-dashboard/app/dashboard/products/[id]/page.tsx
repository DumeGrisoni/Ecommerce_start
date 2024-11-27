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
    <Box
      className="min-h-screen flex-1 justify-center items-center "
      key={product.id}
    >
      <Card className="max-w-screen-xl border justify-center items-center  w-full mx-auto">
        <VStack
          className="flex-1 w-full justify-center items-center"
          space="xl"
        >
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[200px] w-full rounded-md"
            alt="Image du produit"
            resizeMode="contain"
          />
          <Text size="md" className="flex-1 text-left">
            {product.name}
          </Text>
          <Heading size="lg" className="mt-2 font-bold">
            {product.price} €
          </Heading>
        </VStack>
      </Card>
    </Box>
  );
}
