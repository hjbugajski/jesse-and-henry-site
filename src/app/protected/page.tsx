import { Suspense } from 'react';

import { fetchPage } from '@/app/actions';
import { metadata } from '@/app/layout';
import ProtectedForm from '@/components/ProtectedForm';
import { pageTitle } from '@/lib/utils/page-title';

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

const ProtectedFormLoading = () => (
  <div className="flex flex-col gap-4">
    <div className="space-y-2">
      <div className="h-3 w-36 animate-pulse rounded bg-black/5" />
      <div className="h-11 w-full animate-pulse rounded-lg bg-black/5" />
    </div>
    <div className="h-11 w-full animate-pulse rounded-lg bg-black/10" />
  </div>
);

export default function Page() {
  return (
    <section className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="mb-4 text-3xl tracking-wider">Protected</h1>
      <p className="mb-6 text-pretty text-sm">
        Enter the guest password found on the back of your save the date or included with your invitation to view this
        page.
      </p>
      <Suspense fallback={<ProtectedFormLoading />}>
        <ProtectedForm />
      </Suspense>
    </section>
  );
}
