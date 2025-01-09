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

  if (!product) {
    return (
      <Box className="flex-1 justify-center items-center my-auto min-h-screen">
        <Heading>Produit introuvable</Heading>
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen flex-1 justify-center items-center "
      key={product.id}
    >
      <Card className="max-w-screen-xl border justify-center items-center  w-full mx-auto">
        <VStack
          className="flex-1 w-full justify-center items-center flex-col lg:flex-row"
          space="xl"
        >
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[200px] w-[300px] rounded-md"
            alt="Image du produit"
            resizeMode="contain"
          />
          <Box className=" w-[90%] lg:w-[1px] mx-auto lg:my-auto h-[1px] lg:h-[90%] bg-typography-100 my-3 " />
          <VStack className=" justify-center items-center w-full" space="lg">
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
