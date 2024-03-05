import { GLOBALS } from '@/lib/graphql/gloabls';
import { PAGES } from '@/lib/graphql/pages';
import { PayloadConfig, PayloadNavigation } from '@/lib/types/payload';

const PAYLOAD_GRAPHQL = process.env.NEXT_PUBLIC_PAYLOAD_URL! + '/api/graphql';

const NEXT_CONFIG = {
  revalidate: 60,
};

export const fetchGlobals = async (
  cache: 'default' | 'no-cache' = 'default',
): Promise<{
  config: PayloadConfig | undefined;
  navigation: PayloadNavigation | undefined;
}> => {
  const { data, error } = await fetch(PAYLOAD_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(cache === 'no-cache' ? { cache: 'no-cache' } : { next: NEXT_CONFIG }),
    body: JSON.stringify({
      query: GLOBALS,
    }),
  }).then(async (res) => await res.json());

  if (error) {
    console.error(JSON.stringify(error));

    return { config: undefined, navigation: undefined };
  }

  return { config: data.Config, navigation: data.Navigation };
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
