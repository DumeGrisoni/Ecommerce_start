'use client';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { useEffect, useState } from 'react';
import { listCategories } from './create/actions';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    listCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  return (
    <Box className="bg-transparent min-h-screen flex-1 items-center justify-center">
      <Heading>Categories</Heading>
    </Box>
  );
};

export default CategoriesPage;
