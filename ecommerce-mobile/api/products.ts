const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des produits';
    throw new Error(errorMessage);
  }
  return products;
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  const product = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération du produit';
    throw new Error(errorMessage);
  }
  return product;
};
