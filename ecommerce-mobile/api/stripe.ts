const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchStripeKeys = async () => {
  const response = await fetch(`${API_URL}/stripe/keys`);
  const key = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la clé stripe';
    throw new Error(errorMessage);
  }

  return key;
};
