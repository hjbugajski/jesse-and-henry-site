'use server';

import { config } from 'dotenv';
import { revalidatePath } from 'next/cache';
import { stringify } from 'qs';
import { z } from 'zod';

import { FormState } from '@/lib/types/form';
import {
  PayloadApiLogin,
  PayloadApiLogout,
  PayloadApiMe,
  PayloadGuest,
  PayloadPage,
  PayloadRsvpFields,
  PayloadUser,
} from '@/lib/types/payload';
import { getToken, setToken } from '@/lib/utils/cookies';

config();

const { DOMAIN, NEXT_PUBLIC_PAYLOAD_URL, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN, PROTECTED_EMAIL } = process.env;
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

export async function guestLogin(prevState: any, formData: FormData): Promise<FormState | undefined> {
  const schema = z.object({
    first: z.string().min(1),
    last: z.string().min(1),
    password: z.string().min(1),
    code: z.string().min(6).max(6),
    slug: z.string(),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { status: 'error', errors: parsed.error.flatten() };
  }

  try {
    const { first, last, password: parsedPassword, code, slug } = parsed.data;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@${DOMAIN}`;
    const password = `${parsedPassword}-${code}`;

    const data = await fetchLogin<PayloadGuest>('guests', { email, password });

    if (!data) {
      return {
        status: 'error',
        errors: {
          formErrors: [
            'The provided information is incorrect. Verify that your name, password, and party code match your invitation.',
          ],
        },
      };
    }

    setToken(PAYLOAD_GUEST_TOKEN!, data.token);
    revalidatePath(`/${slug}`);
  } catch (error) {
    console.error(JSON.stringify(error));

    return { status: 'error', errors: { formErrors: ['There was an error submitting the form.'] } };
  }
}

export async function protectedLogin(prevState: any, formData: FormData): Promise<FormState | undefined> {
  const schema = z.object({
    password: z.string().min(1),
    slug: z.string(),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { status: 'error', errors: parsed.error.flatten() };
  }

  try {
    const data = await fetchLogin<PayloadUser>('users', { email: PROTECTED_EMAIL!, password: parsed.data.password });

    if (!data) {
      return { status: 'error', errors: { formErrors: ['The provided password is incorrect.'] } };
    }

    setToken(PAYLOAD_PROTECTED_TOKEN!, data.token);
    revalidatePath(`/${parsed.data.slug}`);
  } catch (error) {
    console.error(JSON.stringify(error));

    return { status: 'error', errors: { formErrors: ['Failed to validate password.'] } };
  }
}
