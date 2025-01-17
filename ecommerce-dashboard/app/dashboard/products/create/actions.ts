'use server';
import { redirect } from 'next/navigation';
// import { ProductType } from '@/types/types';
import { API_URL } from '../../../../config';
import { cookies } from 'next/headers';
import { VariantProps } from '@/types/types';

export async function createProduct(
  name: string,
  description: string,
  price: number,
  images: string[],
  newProductId: string,
  categories: string[] | null,
  variant: VariantProps
) {
  let redirectURL = '/dashboard/products';
  // console.log(
  //   'name',
  //   name,
  //   'description',
  //   description,
  //   'price',
  //   price,
  //   'images',
  //   images,
  //   'newProductId',
  //   newProductId,
  //   'category',
  //   category,
  //   'variant',
  //   variant
  // );
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
        categories,
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
        productIds: newProductId,
      }),
    });

    if (!response.ok || !variantResponse.ok) {
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
