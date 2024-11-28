'use server';
import { API_URL } from '@/config';
import { cookies } from 'next/headers';

export const fetchUsers = async () => {
  const token = cookies().get('token')?.value;
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });
  if (!response.ok) {
    throw new Error('Error getting users');
  }
  const data = await response.json();
  return data;
};
