import Link from 'next/link';

import Serialize from '@/components/Serialize';
import { Alert, AlertBody, AlertTitle } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import { Icon } from '@/lib/components/Icon';
import { PayloadBlockAlert } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function BlockAlert(props: PayloadBlockAlert) {
  const { action, color, content, heading, icon, link } = props;

  return (
    <Alert color={color} className="my-6 first:mt-0 last:mb-0">
      <Icon name={icon} />
      <AlertBody>
        <AlertTitle>{heading}</AlertTitle>
        {content && <Serialize nodes={content.root.children} />}
      </AlertBody>
      {action && link && (
        <Button asChild color={color} iconPosition={link.icon ? 'right' : 'none'} size="sm" className="mt-4">
          <Link href={constructUrl(link)} target={link.newTab ? '_blank' : ''} rel={link.rel?.join(',') || ''}>
            {link.text}
            {link.icon && <Icon name={link.icon} />}
          </Link>
        </Button>
      )}
    </Alert>
  );
}
