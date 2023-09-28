import { GLOBALS } from '@/lib/graphql/gloabls';
import { PAGE, PAGES } from '@/lib/graphql/pages';
import { PayloadNavMenu, PayloadPage } from '@/lib/types/payload';
import { getToken } from '@/lib/utils/cookies';
import { PAYLOAD_GRAPHQL, PAYLOAD_GUEST_TOKEN, PAYLOAD_PROTECTED_TOKEN } from '@/lib/utils/env';

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
  const slug = (segments || ['home']).join('/');
  const token = getToken(PAYLOAD_PROTECTED_TOKEN) ?? getToken(PAYLOAD_GUEST_TOKEN);
  let headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = Object.assign(headers, { Authorization: `JWT ${token}` });
  }

  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers,
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
