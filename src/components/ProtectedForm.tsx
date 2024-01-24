'use client';

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InferType, object, string } from 'yup';

import { protectedLogin } from '@/app/actions';
import { Button } from '@/lib/components/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/Form';
import { Input } from '@/lib/components/Input';
import Spinner from '@/lib/components/Spinner';
import { useToast } from '@/lib/hooks/use-toast';
import { ActionState } from '@/lib/types/action-state';

const initialState: ActionState = {
  status: 'idle',
  message: null,
};

const formSchema = object({
  password: string().required('Password is required'),
});

export default function ProtectedForm() {
  const [formState, setFormState] = useState(initialState);

  const form = useForm<InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  async function onSubmit(values: InferType<typeof formSchema>) {
    setFormState({ status: 'pending', message: null });

    const state = await protectedLogin(values);

    if (state.status === 'valid') {
      router.push(searchParams.get('redirectUrl') || '/');
    } else if (state.status === 'error') {
      setFormState(state);
      toast({
        title: 'Login failed',
        description: state.message,
        variant: 'danger',
      });
    } else {
      setFormState({ status: 'idle', message: null });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 text-left">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={formState.status === 'pending'} size="lg" variant="solid">
          {formState.status === 'pending' ? <Spinner /> : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
