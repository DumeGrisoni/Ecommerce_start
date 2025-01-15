'use server';

import { login } from '../../api/auth';
import { cookies } from 'next/headers';

export async function handleLogin(email: string, password: string) {
  try {
    const res = await login(email, password);
    if (res.user.role === 'admin') {
      cookies().set('token', res.token);
      return { success: true, user: res.user, token: res.token };
    } else {
      console.log(res);
      return { role: false, error: res };
    }
  } catch (error) {
    console.log(error);

    // Vérifiez que l'erreur est un objet avec une propriété message
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: 'Une erreur inconnue est survenue' };
    }
  }
}

export async function handleLogout() {
  cookies().delete('token');
  return { success: true };
}
