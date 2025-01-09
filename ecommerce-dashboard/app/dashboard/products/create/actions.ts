'use server';
import { redirect } from 'next/navigation';
// import { ProductType } from '@/types/types';
import { API_URL } from '../../../../config';
import { cookies } from 'next/headers';

export async function createProduct(
  name: string,
  description: string,
  price: number,
  image: string[]
) {
  let redirectURL = '/dashboard/products';
  try {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ name, description, price, image }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la création du produit';
        throw new Error(errorMessage);
      }
    }
  } catch (error) {
    redirectURL = `/dashboard/products/create?errorMessage=${encodeURIComponent(
      'Une erreur est survenue lors de la création du produit'
    )}`;
    console.log(error);
  } finally {
    redirect(redirectURL);
  }
}
