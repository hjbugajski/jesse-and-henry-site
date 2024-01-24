import { notFound, redirect } from 'next/navigation';

import { fetchGuest, fetchPage, fetchUser } from '@/app/actions';
import { Blocks } from '@/components/blocks';
import { fetchPages } from '@/lib/graphql';

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
    title: page?.meta?.title || 'Jesse & Henry',
    description: page?.meta?.description || 'Jesse and Henry are getting married!',
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

  return page.content?.layout?.map((block, i) => <Blocks key={i} block={block} />);
}
