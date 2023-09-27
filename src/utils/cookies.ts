import { cookies } from 'next/headers';

export const getToken = (key: string) => cookies().get(key)?.value;

export const setToken = (key: string, value: string) => cookies().set(key, value);
