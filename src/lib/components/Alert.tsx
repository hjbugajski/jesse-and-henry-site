import { HTMLAttributes, forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const alertVariants = cva(
  'relative rounded-xl py-4 pr-4 pl-12 text-left text-sm [&>i]:absolute [&>i]:top-4 [&>i]:left-4 [&>i]:text-lg [&>i]:leading-6',
  {
    variants: {
      color: {
        neutral: 'text-neutral-10/80 bg-neutral-90/50',
        'neutral-variant': 'text-neutral-variant-30/80 bg-neutral-variant-90/50',
        primary: 'text-primary-20/80 bg-primary-90/50',
        secondary: 'text-secondary-20/80 bg-secondary-90/50',
        tertiary: 'text-tertiary-20/80 bg-tertiary-90/50',
        danger: 'text-danger-20/80 bg-danger-90/50',
      },
    },
    defaultVariants: {
      color: 'neutral',
    },
  },
);

const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, color, ...props }, ref) => (
    <div ref={ref} role="alert" {...props} className={cn(alertVariants({ color }), className)} />
  ),
);
Alert.displayName = 'Alert';

const AlertBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={className} />
));
AlertBody.displayName = 'AlertBody';

const AlertTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h1
      ref={ref}
      {...props}
      className={cn('mb-1 font-sans text-base font-bold normal-case tracking-wider', className)}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

export { Alert, AlertBody, AlertTitle };
