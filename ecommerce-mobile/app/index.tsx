import { FlatList } from 'react-native';
// import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';
import { useEffect, useState } from 'react';
import { listProducts } from '@/api/products';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const productsData = await listProducts();
    setProducts(productsData);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      className="my-2 flex-1"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
