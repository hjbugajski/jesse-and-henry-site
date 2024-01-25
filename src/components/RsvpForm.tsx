'use client';

import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useForm } from 'react-hook-form';
import { InferType, mixed, object, string } from 'yup';

import { updateGuest } from '@/app/actions';
import { Button } from '@/lib/components/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/lib/components/Collapsible';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/Form';
import { Icon } from '@/lib/components/Icon';
import { Input } from '@/lib/components/Input';
import { Spinner } from '@/lib/components/Spinner';
import { Textarea } from '@/lib/components/Textarea';
import { useToast } from '@/lib/hooks/use-toast';
import { ActionState } from '@/lib/types/action-state';
import { PayloadGuest } from '@/lib/types/payload';
import { cn } from '@/lib/utils/cn';

const rsvpArray = ['rsvpRehearsalDinner', 'rsvpWeddingDay', 'rsvpPoolDay'];

const conditionalRsvpIs = (...args: unknown[]) => args.some((arg) => arg === 'accept');

const acceptDeclineSchema = mixed<string>().oneOf(['accept', 'decline'], 'Selection is required').required('Required');

const conditionalYesNoSchema = mixed<string>().when(rsvpArray, {
  is: conditionalRsvpIs,
  then: (schema) => schema.oneOf(['yes', 'no'], 'Selection is required').required('Required'),
  otherwise: (schema) => schema.optional(),
});

const conditionalStringSchema = string().when(rsvpArray, {
  is: conditionalRsvpIs,
  then: (schema) => schema.required('Required'),
  otherwise: (schema) => schema.optional(),
});

const formSchema = object({
  rsvpWelcomeParty: acceptDeclineSchema,
  rsvpRehearsalDinner: acceptDeclineSchema,
  rsvpWeddingDay: acceptDeclineSchema,
  rsvpPoolDay: acceptDeclineSchema,
  transportationToVenue: conditionalYesNoSchema,
  transportationFromVenue: conditionalYesNoSchema,
  legalName: conditionalStringSchema,
  dateOfBirth: conditionalStringSchema,
  countryOfBirth: conditionalStringSchema,
  allergies: string().optional(),
});

export default function RsvpForm({ guest, open = false }: { guest: PayloadGuest; open?: boolean }) {
  const [attendingEvent, setAttendingEvent] = useState(false);
  const [formState, setFormState] = useState<ActionState>({ status: 'idle', message: null });
  const [collapsibleOpen, setCollapsibleOpen] = useState(open);

  const form = useForm<InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      rsvpWelcomeParty: guest.rsvpWelcomeParty || '',
      rsvpRehearsalDinner: guest.rsvpRehearsalDinner || '',
      rsvpWeddingDay: guest.rsvpWeddingDay || '',
      rsvpPoolDay: guest.rsvpPoolDay || '',
      transportationToVenue: guest.transportationToVenue || '',
      transportationFromVenue: guest.transportationFromVenue || '',
      legalName: guest.legalName || '',
      dateOfBirth: guest.dateOfBirth || '',
      countryOfBirth: guest.countryOfBirth || '',
      allergies: guest.allergies || '',
    },
  });
  const { toast } = useToast();

  const watchRsvpRehearsalDinner = form.watch('rsvpRehearsalDinner') === 'accept';
  const watchRsvpWeddingDay = form.watch('rsvpWeddingDay') === 'accept';
  const watchRsvpPoolDay = form.watch('rsvpPoolDay') === 'accept';

  async function onSubmit(values: InferType<typeof formSchema>) {
    setFormState({ status: 'pending', message: null });

    const cleanValues = Object.entries(values).reduce(
      (prev, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          prev[key] = value;
        }

        return prev;
      },
      {} as Record<string, string>,
    );

    const state = await updateGuest(guest.id, cleanValues);

    if (state.status === 'valid') {
      setFormState(state);
      toast({
        title: 'Submission successful',
        description: `RSVP for ${guest.first} ${guest.last} was successfully submitted.`,
        variant: 'success',
      });
      form.reset(undefined, { keepValues: true });
    } else if (state.status === 'error') {
      setFormState(state);
      toast({
        title: 'Error submitting RSVP',
        description: state.message,
        variant: 'danger',
      });
    } else {
      setFormState({ status: 'idle', message: null });
    }
  }

  useEffect(() => {
    setCollapsibleOpen(open);
  }, [open]);

  useEffect(() => {
    setAttendingEvent(watchRsvpRehearsalDinner || watchRsvpWeddingDay || watchRsvpPoolDay);
  }, [watchRsvpRehearsalDinner, watchRsvpWeddingDay, watchRsvpPoolDay]);

  return (
    <div className="border-t-2 border-neutral-variant-50/50 py-4">
      <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
        <div className="flex flex-row items-center justify-between gap-2">
          <h3 className="font-sans text-lg font-bold normal-case">
            {guest.first} {guest.last}
          </h3>
          <CollapsibleTrigger asChild>
            <Button size="icon">
              <Icon name={collapsibleOpen ? 'unfold_less' : 'unfold_more'} />
              <span className="sr-only">{collapsibleOpen ? 'Collapse RSVP form' : 'Expand RSVP form'}</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="rsvpWelcomeParty"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel className="mb-1 block text-sm font-bold">Welcome Party &ndash; July 24</FormLabel>
                      <FormLabel className="block">
                        Join us to kick of our wedding weekend in Florence at 7:00 pm.
                      </FormLabel>
                    </div>
                    <FormControl>
                      <RadioGroup.Root
                        className="grid grid-cols-2 gap-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Button
                          asChild
                          color={field.value === 'accept' ? 'secondary' : 'neutral'}
                          size="lg"
                          className={cn(
                            'w-full text-sm [&>.material-symbols-rounded]:text-base',
                            field.value === 'accept' && 'bg-secondary-90/50',
                          )}
                        >
                          <RadioGroup.Item value="accept">
                            {field.value === 'accept' && <Icon name="check_circle" />}
                            {field.value === 'accept' ? 'Accepted' : 'Accept'}
                          </RadioGroup.Item>
                        </Button>
                        <Button
                          asChild
                          color={field.value === 'decline' ? 'danger' : 'neutral'}
                          size="lg"
                          className={cn('w-full', field.value === 'decline' && 'bg-danger-90/50')}
                        >
                          <RadioGroup.Item value="decline">
                            {field.value === 'decline' && <Icon name="cancel" />}
                            {field.value === 'decline' ? 'Declined' : 'Decline'}
                          </RadioGroup.Item>
                        </Button>
                      </RadioGroup.Root>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rsvpRehearsalDinner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-bold">Rehearsal Dinner &ndash; July 25</FormLabel>
                    <FormControl>
                      <RadioGroup.Root
                        className="grid grid-cols-2 gap-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Button
                          asChild
                          color={field.value === 'accept' ? 'secondary' : 'neutral'}
                          size="lg"
                          className={cn(
                            'w-full text-sm [&>.material-symbols-rounded]:text-base',
                            field.value === 'accept' && 'bg-secondary-90/50',
                          )}
                        >
                          <RadioGroup.Item value="accept">
                            {field.value === 'accept' && <Icon name="check_circle" />}
                            {field.value === 'accept' ? 'Accepted' : 'Accept'}
                          </RadioGroup.Item>
                        </Button>
                        <Button
                          asChild
                          color={field.value === 'decline' ? 'danger' : 'neutral'}
                          size="lg"
                          className={cn('w-full', field.value === 'decline' && 'bg-danger-90/50')}
                        >
                          <RadioGroup.Item value="decline">
                            {field.value === 'decline' && <Icon name="cancel" />}
                            {field.value === 'decline' ? 'Declined' : 'Decline'}
                          </RadioGroup.Item>
                        </Button>
                      </RadioGroup.Root>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rsvpWeddingDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-bold">Wedding Day &ndash; July 26</FormLabel>
                    <FormControl>
                      <RadioGroup.Root
                        className="grid grid-cols-2 gap-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Button
                          asChild
                          color={field.value === 'accept' ? 'secondary' : 'neutral'}
                          size="lg"
                          className={cn(
                            'w-full text-sm [&>.material-symbols-rounded]:text-base',
                            field.value === 'accept' && 'bg-secondary-90/50',
                          )}
                        >
                          <RadioGroup.Item value="accept">
                            {field.value === 'accept' && <Icon name="check_circle" />}
                            {field.value === 'accept' ? 'Accepted' : 'Accept'}
                          </RadioGroup.Item>
                        </Button>
                        <Button
                          asChild
                          color={field.value === 'decline' ? 'danger' : 'neutral'}
                          size="lg"
                          className={cn('w-full', field.value === 'decline' && 'bg-danger-90/50')}
                        >
                          <RadioGroup.Item value="decline">
                            {field.value === 'decline' && <Icon name="cancel" />}
                            {field.value === 'decline' ? 'Declined' : 'Decline'}
                          </RadioGroup.Item>
                        </Button>
                      </RadioGroup.Root>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rsvpPoolDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-bold">Pool Day &ndash; July 27</FormLabel>
                    <FormControl>
                      <RadioGroup.Root
                        className="grid grid-cols-2 gap-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Button
                          asChild
                          color={field.value === 'accept' ? 'secondary' : 'neutral'}
                          size="lg"
                          className={cn(
                            'w-full text-sm [&>.material-symbols-rounded]:text-base',
                            field.value === 'accept' && 'bg-secondary-90/50',
                          )}
                        >
                          <RadioGroup.Item value="accept">
                            {field.value === 'accept' && <Icon name="check_circle" />}
                            {field.value === 'accept' ? 'Accepted' : 'Accept'}
                          </RadioGroup.Item>
                        </Button>
                        <Button
                          asChild
                          color={field.value === 'decline' ? 'danger' : 'neutral'}
                          size="lg"
                          className={cn('w-full', field.value === 'decline' && 'bg-danger-90/50')}
                        >
                          <RadioGroup.Item value="decline">
                            {field.value === 'decline' && <Icon name="cancel" />}
                            {field.value === 'decline' ? 'Declined' : 'Decline'}
                          </RadioGroup.Item>
                        </Button>
                      </RadioGroup.Root>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="transportationToVenue"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">
                          Transportation to Borgo Corsignano &ndash; July 25
                        </FormLabel>
                        <FormLabel className="block">
                          Please indicate if you will be using the provided transportation from Florence to Borgo
                          Corsignano. Visit the guest information page for more details.
                        </FormLabel>
                      </div>
                      <FormControl>
                        <RadioGroup.Root
                          className="grid grid-cols-2 gap-2"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Button
                            asChild
                            color={field.value === 'yes' ? 'secondary' : 'neutral'}
                            size="lg"
                            className={cn(
                              'w-full text-sm [&>.material-symbols-rounded]:text-base',
                              field.value === 'yes' && 'bg-secondary-90/50',
                            )}
                          >
                            <RadioGroup.Item value="yes">
                              {field.value === 'yes' && <Icon name="check_circle" />}
                              {field.value === 'yes' ? 'Yes' : 'Yes'}
                            </RadioGroup.Item>
                          </Button>
                          <Button
                            asChild
                            color={field.value === 'no' ? 'danger' : 'neutral'}
                            size="lg"
                            className={cn('w-full', field.value === 'no' && 'bg-danger-90/50')}
                          >
                            <RadioGroup.Item value="no">
                              {field.value === 'no' && <Icon name="cancel" />}
                              {field.value === 'no' ? 'No' : 'No'}
                            </RadioGroup.Item>
                          </Button>
                        </RadioGroup.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="transportationFromVenue"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">
                          Transportation from Borgo Corsignano &ndash; July 28
                        </FormLabel>
                        <FormLabel className="block">
                          Please indicate if you will be using the provided transportation from Borgo Corsignano to
                          Florence. Visit the guest information page for more details.
                        </FormLabel>
                      </div>
                      <FormControl>
                        <RadioGroup.Root
                          className="grid grid-cols-2 gap-2"
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Button
                            asChild
                            color={field.value === 'yes' ? 'secondary' : 'neutral'}
                            size="lg"
                            className={cn(
                              'w-full text-sm [&>.material-symbols-rounded]:text-base',
                              field.value === 'yes' && 'bg-secondary-90/50',
                            )}
                          >
                            <RadioGroup.Item value="yes">
                              {field.value === 'yes' && <Icon name="check_circle" />}
                              {field.value === 'yes' ? 'Yes' : 'Yes'}
                            </RadioGroup.Item>
                          </Button>
                          <Button
                            asChild
                            color={field.value === 'no' ? 'danger' : 'neutral'}
                            size="lg"
                            className={cn('w-full', field.value === 'no' && 'bg-danger-90/50')}
                          >
                            <RadioGroup.Item value="no">
                              {field.value === 'no' && <Icon name="cancel" />}
                              {field.value === 'no' ? 'No' : 'No'}
                            </RadioGroup.Item>
                          </Button>
                        </RadioGroup.Root>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="legalName"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">Full Legal Name</FormLabel>
                        <FormLabel className="block">
                          This is required to stay at Borgo Corsignano per Italian law.
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">Date of Birth</FormLabel>
                        <FormLabel className="block">
                          This is required to stay at Borgo Corsignano per Italian law.
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          max={new Date().toISOString().split('T')[0]}
                          className="flex flex-row items-center"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="countryOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">Country of Birth</FormLabel>
                        <FormLabel className="block">
                          This is required to stay at Borgo Corsignano per Italian law.
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {attendingEvent && (
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel className="mb-1 block text-sm font-bold">
                          Allergies or Dietary Restrictions{' '}
                        </FormLabel>
                        <FormLabel className="block">(optional)</FormLabel>
                      </div>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" disabled={formState.status === 'pending'} size="lg" variant="solid">
                {formState.status === 'pending' ? <Spinner /> : 'Submit'}
              </Button>
            </form>
          </Form>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
