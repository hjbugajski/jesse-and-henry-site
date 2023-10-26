import { notFound } from 'next/navigation';

import { Blocks } from '@/components/blocks';
import ProtectedForm from '@/components/ProtectedForm';
import { fetchGuest, fetchPage, fetchUser } from '@/lib/api';
import { fetchPages } from '@/lib/graphql';
import { PayloadApiMe } from '@/lib/types/payload';

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
    let userAuth: PayloadApiMe | undefined;
    let guestAuth: PayloadApiMe | undefined;

    await Promise.all([fetchUser(), fetchGuest()]).then(([user, guest]) => {
      userAuth = user;
      guestAuth = guest;
    });

    if (!userAuth?.user && !guestAuth?.user) {
      return (
        <section className="mx-auto w-full max-w-sm px-4 py-12 text-center">
          <h1 className="mb-4 text-3xl tracking-wider">Protected</h1>
          <p className="mb-6 text-sm">
            Enter the guest password found on the back of your save the date or included with your invitation to view
            this page.
          </p>
          <ProtectedForm slug={slug} />
          <p className="mt-4 text-xs italic text-neutral-variant-30/80">You may have click Submit twice.</p>
        </section>
      );
    }
  }

  return page.content?.layout?.map((block, i) => <Blocks key={i} block={block} />);
}
