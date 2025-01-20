'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const listProductVariants = async () => {
  const response = await fetch(`${API_URL}/productVariants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const productVariants = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des variants de produits';
    throw new Error(errorMessage);
  }
  return productVariants;
};

export const getProductVariantByProductId = async (id: number) => {
  const response = await fetch(`${API_URL}/productVariant/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  try {
    const productVariant = await response.json();
    if (!response.ok) {
      const errorMessage =
        'Une erreur est survenue lors de la récupération des details du produit';
      throw new Error(errorMessage);
    } else {
      return productVariant;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function deleteProduct(id: string) {
  let redirectURL = '/dashboard/products';
  try {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la suppression du produit';
        throw new Error(errorMessage);
      }
    }
  } catch (error) {
    redirectURL = `/dashboard/products?errorMessage=${encodeURIComponent(
      'Une erreur est survenue lors de la suppression du produit'
    )}`;
    console.log(error);
  } finally {
    redirect(redirectURL);
  }
}
