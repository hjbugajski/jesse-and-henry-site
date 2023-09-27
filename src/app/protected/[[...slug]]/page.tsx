import { notFound } from 'next/navigation';

import { Blocks } from '@/components/blocks';
import ProtectedForm from '@/components/ProtectedForm';
import { fetchProtectedPage, fetchProtectedPages } from '@/graphql';
import { fetchGuest, fetchUser } from '@/rest';
import { PayloadApiMe } from '@/types/payload';

export async function generateStaticParams() {
  try {
    const pages = await fetchProtectedPages();

    return pages.map(({ slug }) => ({ slug: [slug] }));
  } catch {
    return [{ slug: undefined }];
  }
}

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchProtectedPage(slug);

  return {
    title: page?.meta?.title || 'Jesse & Henry',
    description: page?.meta?.description || 'Jesse and Henry are getting married!',
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string[] } }) {
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
          Enter the guest password found on the back of your save the date or invitation to view this page.
        </p>
        <ProtectedForm slug={slug} />
      </section>
    );
  }

  const page = await fetchProtectedPage(slug);

  if (!page) {
    notFound();
  }

  return page.content.layout?.map((block, i) => <Blocks key={i} block={block} />);
}
