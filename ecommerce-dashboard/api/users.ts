'use server';
import { API_URL } from '@/config';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const fetchUsers = async () => {
  const token = cookies().get('token')?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error('No API URL found');
  }
  if (!token) {
    throw new Error('Token is not available');
  }

  const response = await fetch(`${API_URL}/auth/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const errorText = await response.text();
    throw new Error(`Expected JSON, got: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export const getAdmin = async () => {
  const token = cookies().get('token')?.value;
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const decoded = jwtDecode<{ userId: string }>(token);
    const userId = decoded.userId;

    const response = await fetch(`${API_URL}/auth/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? token : '',
      },
    });

    if (!response.ok) {
      throw Error('Error getting user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Error getting user');
  }
};
