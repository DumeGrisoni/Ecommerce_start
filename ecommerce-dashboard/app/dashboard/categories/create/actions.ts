'use server';
import { redirect } from 'next/navigation';
// import { ProductType } from '@/types/types';
import { API_URL } from '../../../../config';
import { cookies } from 'next/headers';

export async function createCategory(
  name: string,
  productsIds: number[],
  createdAt: string
) {
  let redirectURL = '/dashboard/categories';
  try {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ name, productsIds, createdAt }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la création de la catégorie';
        throw new Error(errorMessage);
      }
    }
  } catch (error) {
    redirectURL = `/dashboard/categories/create?errorMessage=${encodeURIComponent(
      'Une erreur est survenue lors de la création de la catégorie'
    )}`;
    console.log(error);
  } finally {
    redirect(redirectURL);
  }
}

export async function listCategories() {
  try {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Remove Token from cookies
        redirect('/login');
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la récupération des catégories';
        throw new Error(errorMessage);
      }
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
