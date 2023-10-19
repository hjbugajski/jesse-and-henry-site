import { stringify } from 'qs';

import { PayloadApi, PayloadApiMe, PayloadPage } from '@/lib/types/payload';
import { getToken } from '@/lib/utils/cookies';
import { PAYLOAD_API, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN } from '@/lib/utils/env';

const NEXT_CONFIG = {
  revalidate: 60,
};

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

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | undefined> => {
  const token = getToken(PAYLOAD_PROTECTED_TOKEN) ?? getToken(PAYLOAD_GUEST_TOKEN);
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];
  const query = stringify({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  let headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = Object.assign(headers, { Authorization: `JWT ${token}` });
  }

  try {
    const res = await fetch(`${PAYLOAD_API}/pages?depth=1&${query}`, {
      method: 'GET',
      headers,
      next: NEXT_CONFIG,
    });

    if (res.ok) {
      const data: PayloadApi<PayloadPage> = await res.json();

      return data?.docs?.[0] ?? undefined;
    }
  } catch (error) {
    console.error(JSON.stringify(error));

    return undefined;
  }
};

export async function fetchUser() {
  return await fetchMe('users', PAYLOAD_PROTECTED_TOKEN);
}

export async function fetchGuest() {
  return await fetchMe('guests', PAYLOAD_GUEST_TOKEN);
}
