'use server';
import { API_URL } from '@/config';
import { cookies } from 'next/headers';

export async function getOrders() {
  const token = cookies().get('token')?.value;

  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });

  if (!response.ok) {
    throw new Error('Error getting orders');
  }
  const data = await response.json();
  return data;
}

export async function getOrderItems(orderId: number) {
  const token = cookies().get('token')?.value;

  console.log(`Fetching order items for orderId: ${orderId}`);
  console.log(`Using token: ${token}`);

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });

  const textData = await res.text();

  if (!res.ok) {
    console.log('data', textData);
    console.error(`Error response status: ${res.status}`);
    console.error(`Error response text: ${textData}`);
    throw new Error('Error getting order items');
  }

  try {
    const data = JSON.parse(textData); // Parser le texte en JSON
    return data;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    throw new Error('Failed to parse JSON');
  }
}
