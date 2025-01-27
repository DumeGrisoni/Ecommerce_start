import { ProductType, ProductWithVariant, VariantProps } from '@/types/types';
import { listVariants } from './variants';
import { Alert } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des produits';
    throw new Error(errorMessage);
  }

  const variants = await listVariants();
  // Associer les variantes aux produits
  const productsWithVariants = products.map((product: any) => {
    const productVariants = variants.filter(
      (variant: VariantProps) => variant.productId === product.id
    );
    return { ...product, variants: productVariants };
  });

  return productsWithVariants as ProductWithVariant[];
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const product: ProductType = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération du produit';
    throw new Error(errorMessage);
  }
  const variants = await listVariants();
  // Associer les variantes aux produits
  const productVariants = variants.find(
    (variant: VariantProps) => variant.productId === product.productId
  );
  return { ...product, variant: productVariants } as ProductWithVariant;
};
