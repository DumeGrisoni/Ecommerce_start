'use server';
import { redirect } from 'next/navigation';
import { API_URL } from '../../../../config';
import { cookies } from 'next/headers';
import { VariantProps } from '@/types/types';

export async function createProduct(
  name: string,
  description: string[],
  price: number,
  images: string[],
  newProductId: string,
  categories: string[] | null,
  variant: VariantProps
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
      body: JSON.stringify({
        name,
        description,
        price,
        images,
        productId: newProductId,
        categoryId: categories,
      }),
    });

    const variantResponse = await fetch(`${API_URL}/productVariant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        colors: variant.colors,
        productId: newProductId,
      }),
    });

    if (!response.ok || !variantResponse.ok) {
      if (variantResponse.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else if (response.status === 400) {
        const errorText = await response.text();
        console.error(
          'response Error:',
          response.status,
          response.statusText,
          errorText
        );
      } else {
        const errorText = await variantResponse.text();
        console.error(
          'variantResponse Error:',
          variantResponse.status,
          variantResponse.statusText,
          errorText
        );
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
