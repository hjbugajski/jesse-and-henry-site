'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { cn } from '@/lib/utils/cn';

import { Icon } from './Icon';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  ElementRef<typeof AccordionPrimitive.Item>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('group border-b-2 border-neutral-variant-50/80 last:border-b-0', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionHeader = forwardRef<
  ElementRef<typeof AccordionPrimitive.Header>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header
    ref={ref}
    className={cn('flex font-sans font-bold normal-case tracking-normal', className)}
    {...props}
  />
));
AccordionHeader.displayName = AccordionPrimitive.Header.displayName;

const AccordionTrigger = forwardRef<
  ElementRef<typeof AccordionPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex flex-1 justify-between overflow-clip py-4 text-left text-xl hover:text-neutral-10 focus:outline-neutral-variant-50/80 group-first:pt-0 [&[data-state=open]>i]:rotate-180',
      className,
    )}
    {...props}
  >
    {children}
    <Icon name="expand_more" className="shrink-0 text-xl transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<
  ElementRef<typeof AccordionPrimitive.Content>,
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className,
    )}
    {...props}
  >
    <div className="pb-4 pt-0 group-last:pb-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
