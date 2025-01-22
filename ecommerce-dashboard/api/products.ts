/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { listProductVariants } from './productVariants';
import { ProductType, ProductWithVariant, VariantProps } from '@/types/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const listProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const products = await response.json();

  const variants = await listProductVariants();

  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des produits';
    throw new Error(errorMessage);
  } else {
    const productsWithVariants: ProductWithVariant[] = products.map(
      (product: ProductType) => {
        const productVariant = variants.find(
          (variant: VariantProps) => variant.productId === product.productId
        );
        return { ...product, variant: productVariant };
      }
    );

    return productsWithVariants;
  }
};

export const getProductById = async (
  id: number
): Promise<ProductWithVariant> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération du produit';
    throw new Error(errorMessage);
  }

  const product = await response.json();
  const variants = await listProductVariants();

  const productVariant = variants.find(
    (variant: VariantProps) => variant.productId === product.productId
  );

  return { ...product, variant: productVariant };
};

export const updateProduct = async (product: ProductWithVariant) => {
  let redirectURL = `/dashboard/products`;
  const variantId = product.variant.id;
  try {
    const token = cookies().get('token')?.value;
    const { variant, id, ...productWithoutVariantAndId } = product; // Retirer la propriété id de product // Retirer la propriété id de variant

    const productBody = JSON.stringify(productWithoutVariantAndId);
    const variantBody = JSON.stringify(variant);

    const response = await fetch(`${API_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: productBody,
      mode: 'cors',
      cache: 'default',
    });

    if (variant) {
      const variantResponse = await fetch(
        `${API_URL}/productVariant/${variantId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: variantBody,
          mode: 'cors',
          cache: 'default',
        }
      );
      if (!variantResponse.ok) {
        if (variantResponse.status === 401) {
          // Remove Token from cookies
          redirectURL = '/login';
        } else {
          const errorMessage =
            'Une erreur est survenue lors de la mise à jour du variant';
          console.error(
            'Erreur API Variant:',
            variantResponse.status,
            variantResponse.statusText
          );
          throw new Error(errorMessage);
        }
      }
    }
    if (!response.ok) {
      if (response.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la mise à jour du produit';
        console.error('Erreur API:', response.status, response.statusText);
        throw new Error(errorMessage);
      }
    }
  } catch (error) {
    redirectURL = `/dashboard/products/?errorMessage=${encodeURIComponent(
      'Une erreur est survenue lors de la mise à jour du produit'
    )}`;
    console.log(error);
  } finally {
    redirect(redirectURL);
  }
};

export async function deleteProduct(id: string) {
  let redirectURL = '/dashboard/products';
  try {
    const token = cookies().get('token')?.value;

    // Supprimer le variant associé au produit
    const variantResponse = await fetch(`${API_URL}/productVariants/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    if (!variantResponse.ok) {
      if (variantResponse.status === 401) {
        // Remove Token from cookies
        redirectURL = '/login';
      } else {
        const errorMessage =
          'Une erreur est survenue lors de la suppression du variant';
        throw new Error(errorMessage);
      }
    }

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
