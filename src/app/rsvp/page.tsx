import { Metadata } from 'next';
import Link from 'next/link';

import { fetchGuest, fetchGuests } from '@/app/actions';
import RsvpForm from '@/components/RsvpForm';
import RsvpLoginForm from '@/components/RsvpLoginForm';
import { Alert, AlertBody, AlertTitle } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';

export const metadata: Metadata = {
  title: 'RSVP | Jesse & Henry',
  description: "RSVP to Jesse & Henry's wedding.",
};

export default async function Page() {
  const data = await fetchGuest();

  if (!data || !data.user) {
    return (
      <div className="mx-auto w-full max-w-sm px-4 py-12">
        <h1 className="mb-4 text-3xl tracking-wider">Guest login</h1>
        <RsvpLoginForm slug="rsvp" />
      </div>
    );
  }

  const { user } = data;
  const guests = await fetchGuests();

  if (!guests) {
    return (
      <section className="mx-auto w-full max-w-lg py-12">
        <Alert color="danger" className="[&>i]:leading-5">
          <Icon name="warning" />
          <AlertBody className="flex flex-col gap-2">
            <p>There was an error loading your RSVP. Reload the page and try again.</p>
            <p>
              If the issue persists, contact{' '}
              <Link href="mailto:support@jesseandhenry.com">support@jesseandhenry.com</Link>.
            </p>
          </AlertBody>
        </Alert>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-lg py-12">
      <h1 className="mb-2 text-3xl tracking-wider">Welcome, {user.first}</h1>
      <p className="mb-2 text-sm">
        {guests?.length === 1 ? 'RSVP below.' : 'RSVP below for each guest in your party.'}
      </p>

      <div className="my-6 flex flex-col gap-2">
        <Alert color="tertiary" className="[&>i]:leading-5">
          <Icon name="info" />
          <AlertBody>
            <p>More information about each wedding event can be found on the guest information page.</p>
          </AlertBody>
          <Button asChild color="tertiary" size="sm" className="mt-4" iconPosition="right">
            <Link href="/guest-information">
              View Information
              <Icon name="arrow_forward" />
            </Link>
          </Button>
        </Alert>
      </div>

      <RsvpForm {...user} />
      {guests?.filter((guest) => guest.id !== user.id).map((guest, i) => <RsvpForm key={i} {...guest} />)}

      <Alert className="mt-6">
        <Icon name="help" />
        <AlertBody>
          <AlertTitle>RSVP Support</AlertTitle>
          <p>
            If you are having any issues submitting RSVPs, reach out to{' '}
            <Link href="mailto:support@jesseandhenry.com">support@jesseandhenry.com</Link>.
          </p>
        </AlertBody>
      </Alert>
    </section>
  );
}
