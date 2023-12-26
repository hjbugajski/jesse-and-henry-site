'use client';

import { useFormState } from 'react-dom';

import { guestLogin } from '@/app/actions';
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

export default function RsvpLoginForm({ slug }: { slug: string }) {
  const [state, formAction] = useFormState(guestLogin, initialState);

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
          <Label htmlFor="first">First Name</Label>
          <Input
            id="first"
            name="first"
            type="text"
            className={cn(state?.errors?.fieldErrors?.first && 'border-danger-50/80')}
          />
          {state?.errors?.fieldErrors?.first && (
            <Message className="text-danger-30/80">{state.errors.fieldErrors.first.join(' ')}</Message>
          )}
        </FieldSet>
        <FieldSet>
          <Label htmlFor="last">Last Name</Label>
          <Input
            id="last"
            name="last"
            type="text"
            className={cn(state?.errors?.fieldErrors?.last && 'border-danger-50/80')}
          />
          {state?.errors?.fieldErrors?.last && (
            <Message className="text-danger-30/80">{state.errors.fieldErrors.last.join(' ')}</Message>
          )}
        </FieldSet>
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
        <FieldSet>
          <Label htmlFor="code">Party Code</Label>
          <Input
            id="code"
            name="code"
            type="text"
            className={cn(state?.errors?.fieldErrors?.code && 'border-danger-50/80')}
          />
          {state?.errors?.fieldErrors?.code && (
            <Message className="text-danger-30/80">{state.errors.fieldErrors.code.join(' ')}</Message>
          )}
        </FieldSet>
        <input type="hidden" name="slug" value={slug} />

        <SubmitButton className="mt-4">Log In</SubmitButton>
      </form>
    </>
  );
}
