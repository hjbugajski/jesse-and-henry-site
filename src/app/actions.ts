'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { fetchLogin } from '@/lib/api';
import { FormState } from '@/lib/types/form';
import { PayloadGuest, PayloadUser } from '@/lib/types/payload';
import { setToken } from '@/lib/utils/cookies';

const { DOMAIN, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN, PROTECTED_EMAIL } = process.env;

export async function guestLogin(prevState: any, formData: FormData): Promise<FormState | undefined> {
  const schema = z.object({
    first: z.string().min(1),
    last: z.string().min(1),
    password: z.string().min(1),
    code: z.string().min(6).max(6),
    redirect: z.string(),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    return { status: 'error', errors: parsed.error.flatten() };
  }

  const { first, last, password: parsedPassword, code, redirect: parsedRedirect } = parsed.data;
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
  revalidateTag('me');
  redirect(`/${parsedRedirect}`);
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
