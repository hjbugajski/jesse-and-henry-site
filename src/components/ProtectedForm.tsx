'use client';

import { useFormState } from 'react-dom';

import { protectedLogin } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';
import { Alert, AlertBody } from '@/lib/components/Alert';
import { FieldSet, Input, Label, Message } from '@/lib/components/FormField';
import Icon from '@/lib/components/Icon';
import { FormState } from '@/lib/types/form';
import { cn } from '@/lib/utils/cn';

const initialState: FormState = {
  status: null,
  errors: {
    formErrors: [],
    fieldErrors: {},
  },
};

export default function ProtectedForm({ slug }: { slug: string[] }) {
  const [state, formAction] = useFormState(protectedLogin, initialState);

  return (
    <>
      {state?.errors?.formErrors && state.errors.formErrors.length > 0 && (
        <Alert aria-live="polite" color="danger" className="my-6 [&>i]:leading-5">
          <Icon name="warning" />
          <AlertBody>
            <p>{state.errors.formErrors.join(' ')}</p>
          </AlertBody>
        </Alert>
      )}
      <form action={formAction} className="flex w-full flex-col gap-4 text-left">
        <FieldSet>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className={cn(state?.errors?.fieldErrors?.password && 'border-danger-50/80')}
          />
          {state?.errors?.fieldErrors?.password && (
            <Message className="text-danger-30/80">{state.errors.fieldErrors.password.join(' ')}</Message>
          )}
        </FieldSet>
        <input type="hidden" name="slug" value={slug.join('/')} />

        <SubmitButton className="mt-4" />
      </form>
    </>
  );
}
