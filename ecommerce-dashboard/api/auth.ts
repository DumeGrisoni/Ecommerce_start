const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    throw new Error('Une erreur est survenue lors de la connexion');
  }
  console.log(data);
  return data;
}

export async function register(
  email: string,
  password: string,
  name: string,
  surname: string,
  adress: string,
  postalCode: number,
  city: string
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
      surname,
      adress,
      postalCode,
      city,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Une erreur est survenue lors de l'enregistrement");
  }

  return data;
}
