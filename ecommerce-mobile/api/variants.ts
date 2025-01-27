import { VariantProps } from '@/types/types';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listVariants = async () => {
  const response = await fetch(`${API_URL}/productVariant`);
  const variants = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des variants';
    throw new Error(errorMessage);
  }
  return variants as VariantProps[];
};
