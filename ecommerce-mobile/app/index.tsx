import { FlatList, useWindowDimensions } from 'react-native';
import React from 'react';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';
import { useEffect, useState } from 'react';
import { listProducts } from '@/api/products';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';

export default function HomeScreen() {
  // const [products, setProducts] = useState([]);
  // const fetchProducts = async () => {
  //   const productsData = await listProducts();
  //   setProducts(productsData);
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // Changer ici le nombre de colonnes en fonction de la largeur de l'écran
  const numColumns = useBreakpointValue({ default: 2, sm: 3, lg: 4 });

  return (
    <FlatList
      key={numColumns}
      data={products}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2 mx-2"
      className="my-2 flex-1 "
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
