import { useAuth } from '@/store/authStore';

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

export const createPaymentIntent = async () => {
  const token = useAuth.getState().token;
  const response = await fetch(`${API_URL}/stripe/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la création du paiement';
    throw new Error(errorMessage);
  }
  const paymentIntent = await response.json();

  return paymentIntent;
};
