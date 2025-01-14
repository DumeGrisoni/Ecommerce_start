'use client';
import { listCategories } from '@/api/categories';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { CategoryProps } from '@/types/types';
import { useEffect, useState } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const fetchCategories = async () => {
    const data = await listCategories();
    setCategories(data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box className="bg-transparent min-h-screen flex-1 items-center justify-center">
      <Heading>Categories</Heading>

      {categories.map((category) => (
        <Box
          key={category.id}
          className="bg-white shadow-md rounded-lg p-4 m-4"
        >
          <Heading>{category.name}</Heading>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriesPage;
