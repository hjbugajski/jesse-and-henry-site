import { notFound, redirect } from 'next/navigation';

import { fetchGuest, fetchPage, fetchUser } from '@/app/actions';
import { metadata } from '@/app/layout';
import Serialize from '@/components/Serialize';
import { fetchPages } from '@/lib/graphql';
import { pageTitle } from '@/lib/utils/page-title';

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();

    return pages.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  if (!page) {
    notFound();
  }

  if (page.protected) {
    const [user, guest] = await Promise.all([fetchUser(), fetchGuest()]);

    if ((!user || !user?.user) && (!guest || !guest?.user)) {
      redirect(`/protected?redirectUrl=${encodeURIComponent(`/${slug.join('/')}`)}`);
    }
  }

  return page.content?.root?.children && <Serialize nodes={page.content.root.children} />;
}
