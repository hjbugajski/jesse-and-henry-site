'use server';

import { redirect } from 'next/navigation';

import { ActionState } from '@/lib/types/action-state';
import { PayloadApiLogin, PayloadApiMe, PayloadGuest, PayloadPage, PayloadUser } from '@/lib/types/payload';
import { deleteCookie, getCookieValue, setCookie } from '@/lib/utils/cookies';

const { DOMAIN, NEXT_PUBLIC_PAYLOAD_URL, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN, PROTECTED_EMAIL } = process.env;
const PAYLOAD_API = NEXT_PUBLIC_PAYLOAD_URL! + '/api';

const NEXT_CONFIG = {
  revalidate: 60,
};

export type AuthCollection = 'guests' | 'users';

export const fetchGuests = async (): Promise<PayloadGuest[] | null> => {
  try {
    const res = await fetch(`${PAYLOAD_API}/guests`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getCookieValue(PAYLOAD_GUEST_TOKEN!)}`,
      },
    });
    const data = await res.json();

    if (!res.ok || data?.errors) {
      return null;
    }

    return data.docs;
  } catch (error) {
    console.error(JSON.stringify(error));

    return null;
  }
};

const fetchMe = async <T>(collection: AuthCollection): Promise<PayloadApiMe<T> | null> => {
  try {
    const token = collection === 'guests' ? PAYLOAD_GUEST_TOKEN! : PAYLOAD_PROTECTED_TOKEN!;
    const res = await fetch(`${PAYLOAD_API}/${collection}/me`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getCookieValue(token)}`,
      },
    });
    const data = await res.json();

    if (!res.ok || data?.errors) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(JSON.stringify(error));

    return null;
  }
};

export const fetchLogin = async <T>(
  collection: AuthCollection,
  body: { email: string; password: string },
): Promise<PayloadApiLogin<T> | null> => {
  try {
    const res = await fetch(`${PAYLOAD_API}/${collection}/login`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok || data?.errors) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(JSON.stringify(error));

    return null;
  }
};

export const fetchLogout = async (
  collection: AuthCollection,
  redirectUrl: string,
): Promise<ActionState | undefined> => {
  const token = collection === 'users' ? PAYLOAD_PROTECTED_TOKEN! : PAYLOAD_GUEST_TOKEN!;
  const res = await fetch(`${PAYLOAD_API}/${collection}/logout`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getCookieValue(token)}`,
    },
  });
  const data = await res.json();

  if (!res.ok || data?.errors) {
    return {
      status: 'error',
      message: data.errors[0].message,
    };
  }

  deleteCookie(token);
  redirect(redirectUrl);
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | null> => {
  const [user, guest] = await Promise.all([fetchUser(), fetchGuest()]);
  const token = user?.token ?? guest?.token;
  const slugSegments = segments && segments.length > 0 ? segments : ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  try {
    const res = await fetch(`${PAYLOAD_API}/pages?where[slug][equals]=${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `JWT ${token}` } : {}),
      },
      next: NEXT_CONFIG,
    });
    const data = await res.json();

    if (!res.ok || data?.errors) {
      return null;
    }

    return data?.docs?.[0] ?? null;
  } catch (error) {
    console.error(JSON.stringify(error));

    return null;
  }
};

export const fetchUser = async () => await fetchMe<PayloadUser>('users');

export const fetchGuest = async () => await fetchMe<PayloadGuest>('guests');

type GuestLoginParams = {
  first: string;
  last: string;
  password: string;
  code: string;
};

export async function guestLogin(values: GuestLoginParams): Promise<ActionState> {
  const { first, last, password: parsedPassword, code } = values;
  const email = `${first.toLowerCase()}.${last.toLowerCase()}@${DOMAIN}`;
  const password = `${parsedPassword}-${code}`;

  const data = await fetchLogin<PayloadGuest>('guests', { email, password });

  if (!data) {
    return {
      status: 'error',
      message:
        'The provided information is incorrect. Verify that your name, password, and party code match your invitation.',
    };
  }

  setCookie(PAYLOAD_GUEST_TOKEN!, data.token, data.exp);
  deleteCookie(PAYLOAD_PROTECTED_TOKEN!);

  return { status: 'valid', message: data.message };
}

export const updateGuest = async (id: string, fields: Partial<PayloadGuest>): Promise<ActionState> => {
  const res = await fetch(`${PAYLOAD_API}/guests/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getCookieValue(PAYLOAD_GUEST_TOKEN!)}`,
    },
    body: JSON.stringify(fields),
  });
  const data = await res.json();

  if (!res.ok || data?.errors) {
    return {
      status: 'error',
      message: data.errors[0].message,
    };
  }

  return { status: 'valid', message: data.message };
};

type ProtectedLoginParams = {
  password: string;
};

export async function protectedLogin({ password }: ProtectedLoginParams): Promise<ActionState> {
  const data = await fetchLogin<PayloadUser>('users', { email: PROTECTED_EMAIL!, password });

  if (!data) {
    return { status: 'error', message: 'The provided password is incorrect.' };
  }

  setCookie(PAYLOAD_PROTECTED_TOKEN!, data.token, data.exp);

  return { status: 'valid', message: data.message };
}
