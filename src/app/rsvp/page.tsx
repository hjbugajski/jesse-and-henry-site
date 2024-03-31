import Link from 'next/link';

import { fetchGuest, fetchGuests, fetchPage } from '@/app/actions';
import { metadata } from '@/app/layout';
import LogOutButton from '@/components/LogOutButton';
import RsvpForm from '@/components/RsvpForm';
import { Alert, AlertBody, AlertTitle } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import { Icon } from '@/lib/components/Icon';
import { fetchGlobals } from '@/lib/graphql';
import { pageTitle } from '@/lib/utils/page-title';

export async function generateMetadata({ params: { slug } }: { params: { slug: string[] } }) {
  const page = await fetchPage(slug);

  return {
    title: pageTitle(page?.title, metadata),
    description: page?.description || metadata.description,
  };
}

export default async function Page() {
  const [guest, guests, { config }] = await Promise.all([fetchGuest(), fetchGuests(), fetchGlobals('no-cache')]);

  if (!guest || !guest.user || !guests) {
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

  const { user } = guest;
  const disableRsvp = config?.rsvpDeadline ? new Date(config.rsvpDeadline) < new Date() : false;

  return (
    <section className="mx-auto w-full max-w-lg py-12">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-xl leading-none tracking-wider">RSVP</h1>
        <LogOutButton collection="guests" redirectUrl="/rsvp/login" />
      </div>
      <h2 className="mb-2 text-3xl tracking-wider">Welcome, {user.first}</h2>
      <p className="mb-2 text-sm">{guests.length === 1 ? 'RSVP below.' : 'RSVP below for each guest in your party.'}</p>

      <div className="my-6 flex flex-col gap-2">
        <Alert color={disableRsvp ? 'danger' : 'tertiary'} className="[&>i]:leading-5">
          <Icon name="label_important" />
          <AlertBody>
            {disableRsvp && <p>The RSVP deadline has passed. You can no longer make changes.</p>}
            {!disableRsvp && (
              <>
                <AlertTitle>
                  {guests.length === 1 ? 'RSVP' : 'RSVPs'} must be submitted by <strong>April 16, 2024</strong>
                </AlertTitle>
                <p>
                  If we have not received your response by this time, we will have to count you as declined. Our venue
                  requires us to provide final guest counts and accommodation assignments a strict 3 months prior to our
                  wedding. We apologize for any inconvenience this might cause.
                </p>
              </>
            )}
          </AlertBody>
        </Alert>
        <Alert className="[&>i]:leading-5">
          <Icon name="info" />
          <AlertBody>
            <p>More information about each wedding event can be found on the guest information page.</p>
          </AlertBody>
          <Button asChild size="sm" className="mt-4" iconPosition="right">
            <Link href="/guest-information">
              View Information
              <Icon name="arrow_forward" />
            </Link>
          </Button>
        </Alert>
      </div>

      <RsvpForm guest={user} disabled={disableRsvp} open />
      {guests
        .filter((guest) => guest.id !== user.id)
        .map((guest, i) => (
          <RsvpForm key={i} guest={guest} disabled={disableRsvp} />
        ))}

      <div className="border-t-2 border-neutral-variant-50/50 pt-6">
        <Alert>
          <Icon name="help" />
          <AlertBody>
            <AlertTitle>Support</AlertTitle>
            <p>
              If you are having any issues submitting RSVPs, reach out to{' '}
              <Link href="mailto:support@jesseandhenry.com">support@jesseandhenry.com</Link>.
            </p>
          </AlertBody>
        </Alert>
      </div>
    </section>
  );
}
