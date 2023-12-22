'use client';

import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

import { Button } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { PayloadLinkField } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

function Desktop({ links }: { links: PayloadLinkField[] | undefined }) {
  return (
    <>
      {links?.map((link, i) => (
        <li key={i}>
          <Link
            href={constructUrl(link)}
            target={link.newTab ? '_blank' : undefined}
            rel={link.rel?.join(',') || ''}
            className="text-sm !no-underline"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </>
  );
}

function Mobile({ links }: { links: PayloadLinkField[] | undefined }) {
  return (
    <li>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button size="icon">
            <Icon name="menu" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 backdrop-blur-sm" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-end">
            <ul className="flex w-full flex-1 flex-col gap-1 bg-neutral-99/75 p-3 backdrop-blur-md">
              {links?.map((link, i) => (
                <li key={i} className="w-full">
                  <Dialog.Close asChild>
                    <Link
                      href={constructUrl(link)}
                      target={link.newTab ? '_blank' : undefined}
                      rel={link.rel?.join(',') || ''}
                      className="inline-flex w-full justify-center px-4 py-2 text-lg no-underline"
                    >
                      {link.text}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
            <ul className="flex h-16 w-full items-center justify-between bg-neutral-99/75 px-4 backdrop-blur-md">
              <li>
                <Dialog.Close asChild>
                  <Link href="/" className="font-serif uppercase tracking-widest no-underline">
                    J&H
                  </Link>
                </Dialog.Close>
              </li>
              <li>
                <Dialog.Close asChild>
                  <Button size="icon">
                    <Icon name="close" />
                  </Button>
                </Dialog.Close>
              </li>
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </li>
  );
}

export default function NavigationLinks({ links }: { links: PayloadLinkField[] | undefined }) {
  const matchesDesktop = useMediaQuery('(min-width: 768px)');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(matchesDesktop);
  }, [matchesDesktop]);

  return isDesktop ? <Desktop links={links} /> : <Mobile links={links} />;
}
