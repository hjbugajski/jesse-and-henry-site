import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Icon } from '@/lib/components/Icon';

const Countdown = dynamic(() => import('@/components/Countdown'));

export default function Footer() {
  return (
    <footer className="bg-neutral-99 p-4 pb-20 md-lg:pb-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 rounded-3xl bg-neutral-variant-90/75 p-6 text-neutral-variant-30">
        <Countdown />
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            href="https://bugajski.io"
            target="_blank"
            rel="noreferrer"
            className="flex flex-row items-center text-sm no-underline"
          >
            Made with&nbsp;
            <Icon name="favorite" className="text-sm text-danger-40" />
            &nbsp;in NYC
          </Link>
        </div>
      </div>
    </footer>
  );
}
