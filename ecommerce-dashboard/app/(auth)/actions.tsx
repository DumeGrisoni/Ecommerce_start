'use server';

import { login, register } from '@/api/auth';
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

export async function handleRegister(
  email: string,
  password: string,
  name: string,
  surname: string,
  adress: string,
  postalCode: number,
  city: string
) {
  try {
    const res = await register(
      email,
      password,
      name,
      surname,
      adress,
      postalCode,
      city
    );
    if (res.token) {
      cookies().set('token', res.token);
      return { success: true, token: res.token };
    } else {
      return { success: false, error: 'Identifiants erronés' };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
