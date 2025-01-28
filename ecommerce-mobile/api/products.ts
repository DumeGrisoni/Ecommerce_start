import { ProductType, ProductWithVariant, VariantProps } from '@/types/types';
import { listVariants } from './variants';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listProducts = async (): Promise<ProductWithVariant[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const products: ProductType[] = await response.json();

  const variants = await listVariants();
  if (variants.length > 0) {
    // Associer les variantes aux produits
    const productsWithVariants: ProductWithVariant[] = products.map(
      (product: ProductType) => {
        const productVariant = variants.find(
          (variant: VariantProps) => variant.productId === product.productId
        );
        return {
          ...product,
          variant: productVariant || { id: 0, productId: '', colors: [] },
        }; // Gérer le cas où variant est undefined
      }
    );
    if (productsWithVariants.length === 0) {
      console.log('No variants found for products');
    }
    return productsWithVariants;
  } else {
    console.log('No variants found');
    return products as ProductWithVariant[];
  }
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

export const deleteProduct = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la suppression du produit';
    throw new Error(errorMessage);
  }
};
