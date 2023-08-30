'use client';

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import { PayloadNavMenu } from '@/types/payload';

import AppLink from './AppLink';
import MobileMenu from './MobileMenu';

export default function Navigation({ navMenu }: { navMenu: PayloadNavMenu | undefined }) {
  const matchesDesktop = useMediaQuery('(min-width: 768px)');
  const [isDesktop, setIsDesktop] = useState(false);

  const NavLinks = () =>
    navMenu?.links?.map((link, i) => (
      <li key={i}>
        <AppLink
          href={link.type === 'external' ? link.url : `/${link.reference.slug}`}
          target={link.newTab ? '_blank' : undefined}
          rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
          className="h-6 px-2 text-sm"
        >
          {link.text}
        </AppLink>
      </li>
    ));

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
        {isDesktop ? (
          <NavLinks />
        ) : (
          <li>
            <MobileMenu navMenu={navMenu} />
          </li>
        )}
      </ul>
    </nav>
  );
}
