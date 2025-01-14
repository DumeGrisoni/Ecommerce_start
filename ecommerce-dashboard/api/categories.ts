'use server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const listCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    console.log(response);
  }
  const categories = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des produits';
    throw new Error(errorMessage);
  }
  return categories;
};
