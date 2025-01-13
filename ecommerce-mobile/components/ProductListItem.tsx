import { Link } from 'expo-router';
import { Platform, Pressable } from 'react-native';

// ---------------- Imports personnels ---------------
import { Card } from './ui/card';
import { Image } from './ui/image';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { ProductType } from '@/types/types';

// ---------------- Types ---------------

const isWeb = Platform.OS === 'web' ? true : false;

export default function ProductListItem({ product }: { product: ProductType }) {
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
          <Heading size="lg" className="mt-2 font-bold">
            {product.price} €
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
