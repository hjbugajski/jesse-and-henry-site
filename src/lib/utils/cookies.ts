import { cookies } from 'next/headers';

export const getCookieValue = (key: string) => cookies().get(key)?.value;

export const setCookie = (key: string, value: string, exp: number) =>
  cookies().set(key, value, {
    httpOnly: true,
    expires: exp * 1000,
    path: '/',
  });

export const deleteCookie = (key: string) => cookies().delete(key);
