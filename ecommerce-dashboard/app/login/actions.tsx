'use server';

import { login } from '@/api/auth';
import { cookies } from 'next/headers';

export async function handleLogin(email: string, password: string) {
  try {
    const res = await login(email, password);

    if (res.user.role === 'admin') {
      cookies().set('token', res.token);
      return { success: true, user: res.user, token: res.token };
    } else {
      return { role: false, error: "Vous n'êtes pas autorisé" };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function handleLogout() {
  cookies().delete('token');
  return { success: true };
}
