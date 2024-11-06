import { ActivityIndicator, FlatList, View } from 'react-native';
import React from 'react';
import ProductListItem from '../components/ProductListItem';
import { listProducts } from '@/api/products';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text/index.web';

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  // Changer ici le nombre de colonnes en fonction de la largeur de l'écran
  const numColumns = useBreakpointValue({ default: 2, sm: 3, lg: 4 });

  if (isLoading) {
    <View className=" flex-1 h-full w-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>;
  }

  if (error) {
    return (
      <Text>Une erreur est survenue lors du chargement des produits.</Text>
    );
  }

  return (
    <FlatList
      key={numColumns}
      data={data}
      numColumns={numColumns}
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      columnWrapperClassName="gap-2 mx-2"
      className="my-2 flex-1 "
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
