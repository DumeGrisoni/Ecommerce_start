'use server';
import { API_URL } from '@/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function updateOrderStatus(orderId: number, status: string) {
  const redirectUrl = `/dashboard/${orderId}`;
  try {
    const token = cookies().get('token')?.value;

    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        Authorization: token ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  } finally {
    redirect(redirectUrl);
  }
}
