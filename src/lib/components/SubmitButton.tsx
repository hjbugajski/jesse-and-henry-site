'use client';

import { useFormStatus } from 'react-dom';

import Spinner from '@/lib/components/Spinner';

export default function SubmitButton({ text = 'Submit' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-9 w-full items-center justify-center rounded-lg bg-neutral-10/75 text-sm font-bold text-neutral-99 transition-all hover:enabled:cursor-pointer hover:enabled:bg-neutral-10/80 focus:enabled:outline-none focus:enabled:ring-2 focus:enabled:ring-neutral-50/50 disabled:cursor-not-allowed disabled:bg-neutral-90/80 disabled:text-neutral-70/80"
    >
      {pending ? <Spinner /> : text}
    </button>
  );
}
