import {
  ActivityIndicator,
  FlatList,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

// ------------ Imports Personnelles -----------------
import ProductListItem from '../components/ProductListItem';
import { listProducts } from '@/api/products';
import { useBreakpointValue } from '@/components/ui/utils/use-break-point-value';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/components/ui/text/index.web';
import { ProductType } from '@/types/types';
import { CloseIcon, Icon, SearchIcon } from '@/components/ui/icon';
import { HStack } from '@/components/ui/hstack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  // Changer ici le nombre de colonnes en fonction de la largeur de l'écran
  const numColumns = useBreakpointValue({ default: 2, sm: 3, lg: 4 });

  const filteredData = data?.filter((product: ProductType) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <SafeAreaView className="flex-1">
      <HStack className="justify-between w-[90%] mx-auto items-center border border-gray-300 rounded mt-4 mb-2">
        <HStack className="bg-white rounded p-2 gap-2 w-full justify-start items-center">
          <Icon as={SearchIcon} size="xl" color="gray" />
          <TextInput
            placeholder="Rechercher un produit"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} className="ml-auto">
              <Icon as={CloseIcon} size="xl" color="gray" />
            </Pressable>
          )}
        </HStack>
      </HStack>

      <FlatList
        key={numColumns}
        data={filteredData}
        numColumns={numColumns}
        contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
        columnWrapperClassName="gap-2 mx-2"
        className="my-2"
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </SafeAreaView>
  );
}
