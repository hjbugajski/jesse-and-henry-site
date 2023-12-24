import dynamic from 'next/dynamic';
import Link from 'next/link';

import { PayloadNavigation } from '@/lib/types/payload';

const NavigationLinks = dynamic(() => import('./NavigationLinks'));

export default function Navigation({ links }: PayloadNavigation) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 flex-row items-center justify-between gap-4 bg-neutral-99/50 backdrop-blur-md md:bottom-[unset] md:top-0">
      <ul className="flew-row mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-4">
        <li className="mr-auto">
          <Link href="/" className="font-serif uppercase tracking-widest !no-underline">
            J&H
          </Link>
        </li>
        {links && <NavigationLinks links={links} />}
      </ul>
    </nav>
  );
}
