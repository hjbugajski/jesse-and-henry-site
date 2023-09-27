'use client';

import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useMediaQuery } from 'usehooks-ts';

import AppLink from '@/lib/components/AppLink';
import Icon from '@/lib/components/Icon';
import { PayloadNavMenu } from '@/lib/types/payload';

function NavLinks({ navMenu }: { navMenu: PayloadNavMenu | undefined }) {
  return (
    <>
      {navMenu?.links?.map(({ link }, i) => (
        <li key={i}>
          <AppLink
            href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
            target={link.newTab ? '_blank' : undefined}
            rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
            className="h-6 px-2 text-sm"
          >
            {link.text}
          </AppLink>
        </li>
      ))}
    </>
  );
}

function MobileMenu({ navMenu }: { navMenu: PayloadNavMenu | undefined }) {
  return (
    <li>
      <Dialog.Root>
        <Dialog.Trigger className="flex h-9 w-9 items-center justify-center rounded-md p-1 font-bold transition-all hover:text-neutral-10 focus:outline-none focus:ring-2 focus:ring-neutral-variant-40/50">
          <Icon name="menu" className="text-2xl" />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-neutral-variant-10/50" />
          <Dialog.Content className="fixed bottom-2 left-4 right-4 z-50 flex flex-col items-end gap-2">
            <ul className="drop-shadow-neutral-10 flex w-full flex-1 flex-col rounded-xl bg-neutral-variant-90/75 p-3 drop-shadow-sm backdrop-blur-md">
              {navMenu?.links?.map(({ link }, i) => (
                <li key={i} className="w-full">
                  <Dialog.Close asChild>
                    <AppLink
                      href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                      className="w-full justify-center px-4 py-2 text-lg"
                    >
                      {link.text}
                    </AppLink>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
            <ul className="drop-shadow-neutral-10 flex w-full items-center justify-between rounded-xl bg-neutral-variant-90/75 p-3 drop-shadow-sm backdrop-blur-md">
              <li>
                <Dialog.Close asChild>
                  <AppLink href="/" className="h-6 px-2 font-serif uppercase tracking-widest">
                    J&H
                  </AppLink>
                </Dialog.Close>
              </li>
              <li>
                <Dialog.Close
                  className="flex h-9 w-9 items-center justify-center rounded-md p-1 font-bold transition-all hover:text-neutral-10 focus:outline-none focus:ring-2 focus:ring-neutral-variant-40/50"
                  aria-label="Close dialog"
                >
                  <Icon name="close" className="text-2xl" />
                </Dialog.Close>
              </li>
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </li>
  );
}

export default function Navigation({ navMenu }: { navMenu: PayloadNavMenu | undefined }) {
  const matchesDesktop = useMediaQuery('(min-width: 768px)');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(matchesDesktop);
  }, [matchesDesktop]);

  return (
    <nav className="fixed bottom-2 left-4 right-4 z-30 flex flex-row items-center justify-between gap-4 rounded-xl bg-neutral-variant-90/75 p-3 backdrop-blur-md md:bottom-[unset] md:top-2">
      <ul className="flew-row flex h-9 w-full items-center gap-1">
        <li className="mr-auto">
          <AppLink href="/" className="h-9 pl-2 pr-1 font-serif uppercase tracking-widest">
            J&H
          </AppLink>
        </li>
        {isDesktop ? <NavLinks navMenu={navMenu} /> : <MobileMenu navMenu={navMenu} />}
      </ul>
    </nav>
  );
}
