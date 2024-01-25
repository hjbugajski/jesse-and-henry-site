import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import * as ToastPrimitives from '@radix-ui/react-toast';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

import { Icon } from './Icon';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-2 md:max-w-[420px]',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border-2 px-4 py-3 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'group bg-neutral-99/75 backdrop-blur-md text-neutral-10/80 border-neutral-variant-50/50',
        danger: 'group danger bg-danger-90/75 backdrop-blur-md text-danger-10/80 border-danger-50/80',
        success: 'group success bg-secondary-90/75 backdrop-blur-md text-secondary-10/80 border-secondary-50/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 flex size-4 items-center justify-center rounded-md opacity-0 transition-opacity hover:bg-neutral-90/50 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-40/50 group-hover:opacity-100 group-[.danger]:hover:bg-danger-90/50 group-[.success]:hover:bg-secondary-90/50 group-[.danger]:focus:ring-danger-40/50 group-[.success]:focus:ring-secondary-40/50',
      className,
    )}
    toast-close=""
    {...props}
  >
    <Icon name="close" className="text-base" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-base font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn('text-sm', className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = ComponentPropsWithoutRef<typeof Toast>;

export { type ToastProps, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose };
