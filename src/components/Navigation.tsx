import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@/lib/components/Button';
import { Icon } from '@/lib/components/Icon';
import { PayloadNavigation } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

const MobileLinks = dynamic(() => import('./MobileLinks'));

const DesktopLinks = ({ callToAction, links, showCta }: PayloadNavigation) => (
  <>
    {links?.map((link) => (
      <li key={link.id} className="hidden md-lg:inline-block">
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
    {showCta && callToAction && (
      <Button
        asChild
        color={callToAction.color}
        iconPosition={callToAction.icon ? 'right' : 'none'}
        size="md"
        variant="solid"
      >
        <Link
          href={constructUrl(callToAction)}
          target={callToAction.newTab ? '_blank' : ''}
          rel={callToAction.rel?.join(',') || ''}
        >
          {callToAction.text}
          {callToAction.icon && <Icon name={callToAction.icon} />}
        </Link>
      </Button>
    )}
  </>
);

export default function Navigation(props: PayloadNavigation) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 flex-row items-center justify-between gap-4 bg-neutral-99/50 backdrop-blur-md md-lg:bottom-[unset] md-lg:top-0">
      <ul className="flew-row mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-4">
        <li className="mr-auto">
          <Link href="/" className="font-serif uppercase tracking-widest !no-underline">
            J&H
          </Link>
        </li>
        {props && <DesktopLinks {...props} />}
        {props && <MobileLinks {...props} />}
      </ul>
    </nav>
  );
}
