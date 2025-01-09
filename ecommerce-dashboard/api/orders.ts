'use server';
import { API_URL } from '@/config';
import { cookies } from 'next/headers';

export async function getOrders() {
  const token = cookies().get('token')?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });
  const data = await res.json();

  if (!res.ok) {
    console.log('data', data);
    throw new Error('Error getting order items');
  }

  return data;
}
