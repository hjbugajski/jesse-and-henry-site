import Link from 'next/link';

import { Button } from '@/lib/components/Button';
import { Icon } from '@/lib/components/Icon';
import { PayloadBlockButtonLink } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function BlockButtonLink(props: PayloadBlockButtonLink) {
  const { color, icon, newTab, rel, text } = props;

  return (
    <div className="my-4 first:mt-0 last:mb-0">
      <Button asChild color={color} iconPosition={icon ? 'right' : 'none'}>
        <Link href={constructUrl(props)} target={newTab ? '_blank' : ''} rel={rel?.join(',') || ''}>
          {text}
          {icon && <Icon name={icon} />}
        </Link>
      </Button>
    </div>
  );
}
