import Link from 'next/link';

// ---------- Imports Personnels ----------
import { listProducts } from '@/api/products';
import ProductListItem from '@/components/products/ProductListItem';
import { Card } from '@/components/ui/card';
import { ProductType } from '@/types/types';
import { AddIcon, Icon } from '@/components/ui/icon';

const ProductsPage = async () => {
  const products: ProductType[] = await listProducts();
  return (
    <div className="flex flex-wrap gap-2 max-w-[1400px] my-6 w-full mx-auto h-full">
      <Link href="/dashboard/products/create">
        <Card className="flex items-center justify-center w-full h-full min-w-[300px]">
          <Icon as={AddIcon} className="w-8 h-8 color-typography-500" />
        </Card>
      </Link>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
