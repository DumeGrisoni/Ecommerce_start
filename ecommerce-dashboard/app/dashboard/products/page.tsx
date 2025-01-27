'use client';
import Link from 'next/link';

// ---------- Imports Personnels ----------
import { listProducts } from '@/api/products';
import ProductListItem from '@/components/products/ProductListItem';
import { Card } from '@/components/ui/card';
import { CategoryProps, ProductWithVariant } from '@/types/types';
import { AddIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { listCategories } from '@/api/categories';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Pressable } from 'react-native';

const ProductsPage = () => {
  // ---------- Hooks ----------
  const [products, setProducts] = useState<ProductWithVariant[]>([]);
  const [filteredData, setFilteredData] = useState<ProductWithVariant[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<string>('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ProductWithVariant[]>([]);

  // ---------- Functions ----------

  const loadProducts = async () => {
    try {
      const products = await listProducts();
      setProducts(products);
      setFilteredData(products);
      setSearchResults(products);
    } catch (error) {
      console.log('error', error);
    }
  };

  const findMinAndMaxProductPrices = (products: ProductWithVariant[]) => {
    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setSelectedMinPrice(minPrice.toString());
    setSelectedMaxPrice(maxPrice.toString());
  };

  const loadCategories = async () => {
    const categories = await listCategories();
    setCategories(categories);
  };

  const handleSearch = (results: ProductWithVariant[]) => {
    setSearchResults(results);
    applyFilters(
      selectedCategory,
      Number(selectedMinPrice),
      Number(selectedMaxPrice),
      results
    );
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    applyFilters(category, Number(selectedMinPrice), Number(selectedMaxPrice));
  };
  const handleMinPriceChange = (value: string) => {
    setSelectedMinPrice(value);
    applyFilters(selectedCategory, Number(value), Number(selectedMaxPrice));
  };

  const handleMaxPriceChange = (value: string) => {
    setSelectedMaxPrice(value);
    applyFilters(selectedCategory, Number(selectedMinPrice), Number(value));
  };

  const applyFilters = (
    category: string,
    minPrice: number,
    maxPrice: number,
    data: ProductWithVariant[] = searchResults
  ) => {
    let filtered = data;
    if (category) {
      filtered = filtered.filter((product) =>
        product.categoryId.includes(category)
      );
    }
    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredData(filtered);
  };

  const resetCategoryFilter = () => {
    setSelectedCategory('');
    applyFilters('', Number(selectedMinPrice), Number(selectedMaxPrice));
  };

  // ---------- Variables ----------

  // ---------- Effect ----------

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    findMinAndMaxProductPrices(products);
  }, [products]);

  useEffect(() => {
    console.log('selected Min Price', selectedMinPrice);
    console.log('selected Max Price', selectedMaxPrice);
  }, [selectedMinPrice, selectedMaxPrice]);
  useEffect(() => {
    console.log('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  // ---------- Render ----------
  return (
    <div className="flex flex-wrap gap-2 max-w-[1400px] my-6 w-full mx-auto h-full">
      <SearchBar data={products} onSearch={handleSearch} />
      <Link href="/dashboard/products/create" className="mx-1 w-full">
        <Card className="flex border-dashed hover:border-solid border-2  border-slate-400 items-center justify-center h-full w-full min-w-[303px] lg:min-w-[345px]">
          <Icon as={AddIcon} className="w-8 h-8 color-typography-500" />
        </Card>
      </Link>
      <HStack
        className={`w-full justify-start items-center m-2 flex-col lg:flex-row`}
        space={'md'}
      >
        <HStack space="md" className={`items-center`}>
          {selectedCategory !== '' && (
            <Pressable onPress={resetCategoryFilter}>
              <Icon as={CloseIcon} className="w-4 h-4 color-typography-800" />
            </Pressable>
          )}
          <select
            value={selectedCategory}
            className="p-2 rounded border border-slate-300 text-typography-500"
            onChange={handleCategoryChange}
          >
            <option value="" disabled selected>
              Catégorie
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </HStack>
        <HStack className={`items-center`} space="md">
          <HStack className={`items-center`} space="xs">
            <Text className="text-typography-800">Prix mini:</Text>
            <Input className="w-20">
              <InputField
                defaultValue={selectedMinPrice}
                value={selectedMinPrice}
                placeholder={selectedMinPrice}
                keyboardType="numeric"
                onChangeText={handleMinPriceChange}
              />
            </Input>
          </HStack>
          <HStack className={`items-center`} space="xs">
            <Text className="text-typography-800">Prix max:</Text>
            <Input className="w-20">
              <InputField
                defaultValue={selectedMaxPrice}
                value={selectedMaxPrice}
                placeholder={selectedMaxPrice}
                keyboardType="numeric"
                onChangeText={handleMaxPriceChange}
              />
            </Input>
          </HStack>
        </HStack>
      </HStack>
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))
      ) : (
        <HStack className="flex-1 w-full justify-center mt-10">
          <Heading className="text-typography-800 text-center">
            Aucun produit trouvé
          </Heading>
        </HStack>
      )}
    </div>
  );
};

export default ProductsPage;
