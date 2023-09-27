'use client';

// @ts-expect-error - no type definitions exist for this export yet
import { experimental_useFormState as useFormState } from 'react-dom';

import { protectedLogin } from '@/app/actions';
import { FormState } from '@/types/form';
import { classes } from '@/utils/classes';

import SubmitButton from './SubmitButton';

const initialState: FormState = {
  status: null,
  message: null,
};

export default function ProtectedForm({ slug }: { slug: string[] }) {
  const [state, formAction] = useFormState(protectedLogin, initialState);

  return (
    <form action={formAction} className="mx-auto flex w-full max-w-sm flex-col gap-4 text-left">
      <label className="flex flex-col gap-1" htmlFor="password">
        <span className="text-xs text-neutral-variant-30/80">Password</span>
        <input
          className={classes(
            'block h-11 w-full rounded-lg border-2 border-neutral-50/80 bg-neutral-98 px-3 text-inherit placeholder:text-neutral-variant-60/80 hover:border-neutral-50 hover:bg-neutral-99 focus:bg-neutral-99 focus:outline-none focus:ring-2 focus:ring-neutral-50/50',
            state?.status === 'error' && 'ring-danger-50/80',
          )}
          id="password"
          name="password"
          type="password"
        />
      </label>
      <input type="hidden" name="slug" value={slug.join('/')} />
      {state?.message && (
        <p aria-live="polite" className="px-3 text-xs text-danger-30/80">
          {state.message}
        </p>
      )}
      <SubmitButton text="Submit" />
    </form>
  );
}
