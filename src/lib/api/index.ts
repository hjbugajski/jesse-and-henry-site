'use server';

import { config } from 'dotenv';
import { stringify } from 'qs';

import {
  PayloadApiLogin,
  PayloadApiLogout,
  PayloadApiMe,
  PayloadGuest,
  PayloadPage,
  PayloadRsvpFields,
  PayloadUser,
} from '@/lib/types/payload';
import { getToken } from '@/lib/utils/cookies';

config();

const { NEXT_PUBLIC_PAYLOAD_URL, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN } = process.env;
const PAYLOAD_API = NEXT_PUBLIC_PAYLOAD_URL! + '/api';

const NEXT_CONFIG = {
  revalidate: 60,
};

export type AuthCollection = 'guests' | 'users';

export const fetchGuestRsvp = async (
  id: string,
  field: PayloadRsvpFields,
  rsvp: 'accept' | 'decline' | null,
): Promise<PayloadGuest | null> => {
  try {
    const res = await fetch(`${PAYLOAD_API}/guests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken(PAYLOAD_GUEST_TOKEN!)}`,
      },
      body: JSON.stringify({ [field]: rsvp }),
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

export const fetchGuests = async (): Promise<PayloadGuest[] | null> => {
  try {
    const res = await fetch(`${PAYLOAD_API}/guests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken(PAYLOAD_GUEST_TOKEN!)}`,
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
    const token = collection === 'users' ? PAYLOAD_PROTECTED_TOKEN! : PAYLOAD_GUEST_TOKEN!;
    const res = await fetch(`${PAYLOAD_API}/${collection}/me`, {
      method: 'GET',
      next: {
        tags: ['me'],
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken(token)}`,
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

export const fetchLogout = async (collection: AuthCollection): Promise<PayloadApiLogout | null> => {
  try {
    const token = collection === 'users' ? PAYLOAD_PROTECTED_TOKEN! : PAYLOAD_GUEST_TOKEN!;
    const res = await fetch(`${PAYLOAD_API}/${collection}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${getToken(token)}`,
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

export const fetchPage = async (segments?: string[]): Promise<PayloadPage | null> => {
  const token = getToken(PAYLOAD_PROTECTED_TOKEN!) ?? getToken(PAYLOAD_GUEST_TOKEN!);
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
