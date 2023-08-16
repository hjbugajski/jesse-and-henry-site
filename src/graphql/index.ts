import { PayloadPage } from '@/types/payload';

import { PAGE, PAGES } from './pages';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL + '/api/graphql';
const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchPage = async (segments?: string[]): Promise<PayloadPage> => {
  const slugSegments = segments || ['home'];
  const slug = slugSegments[slugSegments.length - 1];

  const { data, error } = await fetch(PAYLOAD_URL, {
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
  }).then((res) => res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs[0];
};

export const fetchPages = async (): Promise<Array<{ slug: string }>> => {
  const { data, error } = await fetch(PAYLOAD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: NEXT_CONFIG,
    body: JSON.stringify({
      query: PAGES,
    }),
  }).then((res) => res.json());

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error();
  }

  return data.Pages.docs;
};
