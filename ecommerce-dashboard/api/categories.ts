'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const token = cookies().get('token')?.value;

export const listCategories = async () => {
  const response = await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  if (!response.ok) {
    console.log(response);
  }
  const categories = await response.json();
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la récupération de la liste des produits';
    throw new Error(errorMessage);
  }
  return categories;
};

export const createCategory = async (name: string) => {
  const createDate = new Date().toISOString();
  const productIdsList = [] as string[];
  const response = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ name, productIdsList, createDate }),
  });
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la création de la catégorie';
    throw new Error(errorMessage);
  }
  return response.json();
};

export const updateCategory = async (id: number, name: string) => {
  const updates = { name };
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    console.log('data', updates);
  }
  return response.json();
};

export const deleteCategory = async (id: number) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  if (!response.ok) {
    const errorMessage =
      'Une erreur est survenue lors de la suppression de la catégorie';
    throw new Error(errorMessage);
  }
  return response.json();
};
