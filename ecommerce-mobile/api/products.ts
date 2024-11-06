const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const listProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const products = await response.json();

  return products;
};
