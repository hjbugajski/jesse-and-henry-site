import { Metadata } from 'next';

import RsvpLoginForm from '@/components/RsvpLoginForm';

export const metadata: Metadata = {
  title: 'RSVP Login | Jesse & Henry',
  description: "Log in to RSVP to Jesse & Henry's wedding.",
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="mb-4 text-3xl tracking-wider">Guest login</h1>
      <RsvpLoginForm />
    </div>
  );
}
