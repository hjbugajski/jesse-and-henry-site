import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/lib/components/Icon';
import { PayloadBlockImageLink } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function BlockImageLink({ image, ...link }: PayloadBlockImageLink) {
  return (
    <div className="relative my-4 flex h-96 w-full items-center justify-center overflow-clip rounded-xl">
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        placeholder="blur"
        blurDataURL={image.dataUrl}
        className="absolute object-cover object-center"
      />
      <div className="absolute inset-0 z-0 h-full w-full rounded-xl bg-neutral-10/50" />
      <Link
        href={constructUrl(link)}
        target={link.newTab ? '_blank' : ''}
        rel={link.rel?.join(',') || ''}
        className="drop-shadow-neutral-10 z-10 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl text-neutral-95 no-underline drop-shadow-sm hover:text-primary-95"
      >
        {link.icon && <Icon name={link.icon} className="h-32 w-32" />}
        <span className="mx-auto max-w-xs text-center font-serif text-xl uppercase tracking-wider">{link.text}</span>
      </Link>
    </div>
  );
}
