'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils/cn';

const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>, ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-xs text-neutral-variant-30/80 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
