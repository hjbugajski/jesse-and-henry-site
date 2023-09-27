import { PayloadNavMenu, PayloadPage, PayloadProtectedPage } from '@/types/payload';
import { getToken } from '@/utils/cookies';
import { PAYLOAD_GRAPHQL, PAYLOAD_PROTECTED_TOKEN } from '@/utils/env';

import { GLOBALS } from './gloabls';
import { PAGE, PAGES, PROTECTED_PAGE, PROTECTED_PAGES } from './pages';

const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchGlobals = async (): Promise<{ navMenu: PayloadNavMenu | undefined }> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: GLOBALS,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    return { navMenu: undefined };
  }

  return { navMenu: data.NavMenu };
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage> => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PAGE,
      variables: {
        slug,
      },
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs[0];
};

export const fetchPages = async (): Promise<Array<{ slug: string }>> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PAGES,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs;
};

export const fetchProtectedPage = async (segments?: string[]): Promise<PayloadProtectedPage> => {
  const slugSegments = segments || ['protected'];
  const slug = 'protected/' + slugSegments[slugSegments.length - 1];

  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken(PAYLOAD_PROTECTED_TOKEN)}`,
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PROTECTED_PAGE,
      variables: {
        slug,
      },
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.ProtectedPages.docs[0];
};

export const fetchProtectedPages = async (): Promise<Array<{ slug: string }>> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken(PAYLOAD_PROTECTED_TOKEN)}`,
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PROTECTED_PAGES,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.ProtectedPages.docs;
};
