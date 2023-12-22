import { PayloadGuest, PayloadRsvpFields } from '@/lib/types/payload';

import RsvpEvent from './RsvpEvent';

export type Event = {
  name: string;
  date: string;
  description: string;
  field: PayloadRsvpFields;
};

const events: Event[] = [
  {
    name: 'Welcome Party',
    date: 'July 24',
    description: 'Join us to kick of our wedding weekend in Florence at 7:00 pm.',
    field: 'rsvpWelcomeParty',
  },
  {
    name: 'Rehearsal Dinner',
    date: 'July 25',
    description: '',
    field: 'rsvpRehearsalDinner',
  },
  {
    name: 'Wedding Day',
    date: 'July 26',
    description: '',
    field: 'rsvpWeddingDay',
  },
  {
    name: 'Pool Day',
    date: 'July 27',
    description: '',
    field: 'rsvpPoolDay',
  },
];

export default function RsvpForm(guest: PayloadGuest) {
  return (
    <form className="flex flex-col gap-4 border-t-2 border-neutral-variant-50/50 pb-6 pt-4 last-of-type:border-b-2">
      <h3 className="font-sans text-lg font-bold normal-case">
        {guest.first} {guest.last}
      </h3>
      {events.map((event, i) => (
        <RsvpEvent key={i} event={event} guest={guest} />
      ))}
    </form>
  );
}
