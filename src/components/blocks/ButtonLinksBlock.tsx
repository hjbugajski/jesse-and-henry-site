import Link from 'next/link';

import { Button } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadButtonLinksBlock } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function ButtonLinksBlock({ block }: { block: PayloadButtonLinksBlock }) {
  const { links } = block;

  return (
    <ul className="flex flex-row flex-wrap gap-4">
      {links?.map((link, i) => (
        <li key={i}>
          <Button asChild color={link.color} iconPosition="right">
            <Link
              href={constructUrl(link)}
              target={link.newTab ? '_blank' : ''}
              rel={link.rel?.join(',') || ''}
              className="w-fit"
            >
              {link.text}
              {link.icon && <Icon name={link.icon} />}
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
