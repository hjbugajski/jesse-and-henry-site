import { PayloadApiMe } from '@/lib/types/payload';
import { getToken } from '@/lib/utils/cookies';
import { PAYLOAD_API, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN } from '@/lib/utils/env';

export async function fetchLogin(email: string, password: string) {
  return await fetch(`${PAYLOAD_API}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function fetchMe(path: string, tokenKey: string): Promise<PayloadApiMe | undefined> {
  try {
    const res = await fetch(`${PAYLOAD_API}/${path}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken(tokenKey)}`,
      },
    });

    return res.ok ? await res.json() : undefined;
  } catch (error) {
    console.error(JSON.stringify(error));

    return undefined;
  }
}

export async function fetchUser() {
  return await fetchMe('users', PAYLOAD_PROTECTED_TOKEN);
}

export async function fetchGuest() {
  return await fetchMe('guests', PAYLOAD_GUEST_TOKEN);
}
