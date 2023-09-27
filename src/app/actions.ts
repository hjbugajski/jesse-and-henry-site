'use server';

import { config } from 'dotenv';
import { revalidatePath } from 'next/cache';

import { fetchLogin } from '@/rest';
import { FormState } from '@/types/form';
import { setToken } from '@/utils/cookies';
import { PAYLOAD_PROTECTED_TOKEN, PROTECTED_EMAIL } from '@/utils/env';

config();

export async function protectedLogin(prevState: any, formData: FormData): Promise<FormState | undefined> {
  const password = formData.get('password') as string;
  const slug = formData.get('slug') as string;

  if (!password) {
    return { status: 'error', message: 'Password is required' };
  }

  try {
    const res = await fetchLogin(PROTECTED_EMAIL, password);
    const data = await res.json();

    if (res.ok) {
      setToken(PAYLOAD_PROTECTED_TOKEN, data.token);
      revalidatePath(`/protected/${slug}`);
    } else {
      console.error(JSON.stringify(data));

      return { status: 'error', message: 'The provided password is incorrect' };
    }
  } catch (error) {
    console.error(JSON.stringify(error));

    return { status: 'error', message: 'Failed to validate password' };
  }
}
