import { useAuth } from '@/store/authStore';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ order: {}, items }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log('data', data);
    throw new Error('Error creating order');
  }
  return data;
}

export async function getOrders(userId: number) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    console.log('data', data);

    throw new Error('Error getting orders');
  }

  const userOrders = data.filter((order: any) => order.userId === userId);
  return userOrders;
}

export async function getOrder(orderId: number) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (!res.ok) {
    console.log('data', data);
    throw new Error('Error getting order');
  }

  return data;
}

export async function getOrderItems(orderId: number) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders/${orderId}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    console.log('data', data);
    throw new Error('Error getting order items');
  }

  return data;
}
