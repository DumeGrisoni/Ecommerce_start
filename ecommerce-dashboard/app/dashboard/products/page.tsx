'use client';
import Link from 'next/link';

// ---------- Imports Personnels ----------
import { listProducts } from '@/api/products';
import ProductListItem from '@/components/products/ProductListItem';
import { Card } from '@/components/ui/card';
import { ProductType } from '@/types/types';
import { AddIcon, Icon } from '@/components/ui/icon';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const loadProducts = async () => {
    try {
      const products = await listProducts();
      setProducts(products);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 max-w-[1400px] my-6 w-full mx-auto h-full">
      <Link href="/dashboard/products/create">
        <Card className="flex border-dashed hover:border-solid border-2 border-slate-400 items-center justify-center mx-auto h-full w-full min-w-[300px] lg:min-w-[345px]">
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
