import { GLOBALS } from '@/lib/graphql/gloabls';
import { PAGES } from '@/lib/graphql/pages';
import { PayloadNavigation } from '@/lib/types/payload';
import { PAYLOAD_GRAPHQL } from '@/lib/utils/env';

const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchGlobals = async (): Promise<{ navigation: PayloadNavigation | undefined }> => {
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

    return { navigation: undefined };
  }

  return { navigation: data.Navigation };
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
