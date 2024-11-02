import { Dimensions, FlatList } from 'react-native';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';

export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      numColumns={2}
      contentContainerClassName="gap-2 mx-2"
      columnWrapperClassName="gap-2"
      className="my-2 flex-1"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
