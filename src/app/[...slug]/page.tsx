import { notFound, redirect } from 'next/navigation';

import { fetchGuest, fetchPage, fetchUser } from '@/app/actions';
import { Blocks } from '@/components/blocks';
import { fetchPages } from '@/lib/graphql';
import { PayloadApiMe, PayloadGuest, PayloadUser } from '@/lib/types/payload';

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

  if (page?.protected) {
    let userAuth: PayloadApiMe<PayloadUser> | null | undefined;
    let guestAuth: PayloadApiMe<PayloadGuest> | null | undefined;

    await Promise.all([fetchUser(), fetchGuest()]).then(([user, guest]) => {
      userAuth = user;
      guestAuth = guest;
    });

    if ((!userAuth && !guestAuth) || (!userAuth?.user && !guestAuth?.user)) {
      redirect(`/protected?redirectUrl=${encodeURIComponent(`/${slug.join('/')}`)}`);
    }
  }

  return page.content?.layout?.map((block, i) => <Blocks key={i} block={block} />);
}
