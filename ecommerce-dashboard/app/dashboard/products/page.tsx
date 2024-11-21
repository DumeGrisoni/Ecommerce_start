import { listProducts } from '@/api/products';
import ProductListItem from '@/components/products/ProductListItem';
import { ProductType } from '@/types/types';

const ProductsPage = async () => {
  const products: ProductType[] = await listProducts();
  return (
    <div className="flex flex-wrap gap-2 max-w-[1400px] my-6 w-full mx-auto h-full">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
