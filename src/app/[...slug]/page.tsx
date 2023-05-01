import { notFound } from 'next/navigation';

import { Blocks } from '@/components/blocks';
import { fetchPage, fetchPages } from '@/graphql';

export default async function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  if (!page) {
    return notFound();
  }

  return page.content.layout?.map((block, i) => <Blocks key={i} block={block} />);
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  return {
    title: page?.meta?.title || 'Jesse & Henry',
    description: page?.meta?.description || 'Jesse and Henry are getting married!'
  };
}

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();

    return pages.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}
