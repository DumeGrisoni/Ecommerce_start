'use server';

import { login } from '../../api/auth';
import { cookies } from 'next/headers';

export async function handleLogin(email: string, password: string) {
  try {
    const res = await login(email, password);
    console.log('response', res);
    if (res.user.role === 'admin') {
      cookies().set('token', res.token);
      return { success: true, user: res.user, token: res.token };
    } else {
      return { role: false, error: "Vous n'êtes pas autorisé" };
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
