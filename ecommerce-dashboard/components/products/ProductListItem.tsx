'use client';
import Link from 'next/link';

// ---------------- Imports personnels ---------------
import { Card } from '../ui/card';
import { Image } from '../ui/image';
import { Text } from '../ui/text';
import { Heading } from '../ui/heading';
import { ProductWithVariant } from '@/types/types';
export default function ProductListItem({
  product,
}: {
  product: ProductWithVariant;
}) {
  //---------Hooks-----------

  //---------Variables-----------

  //---------Functions-----------

  // --------Effect----------

  //---------Render-----------
  return (
    <Link
      href={`/dashboard/products/${product.id}`}
      key={product.id}
      className="flex-1 inline-flex min-w-[296px] mx-1 md:min-w-[300px]"
    >
      <Card
        className={`flex-1 hover:border-slate-400  border`}
        variant="elevated"
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
    </Link>
  );
}
