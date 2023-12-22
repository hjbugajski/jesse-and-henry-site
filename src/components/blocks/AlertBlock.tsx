import Link from 'next/link';

import Serialize from '@/components/Serialize';
import { Alert, AlertBody, AlertTitle } from '@/lib/components/Alert';
import { Button } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadAlertBlock } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function AlertBlock({ block }: { block: PayloadAlertBlock }) {
  const { link, color, content, icon, title, width } = block;

  const RenderAlert = () => (
    <Alert color={color}>
      <Icon name={icon} />
      <AlertBody>
        <AlertTitle>{title}</AlertTitle>
        <Serialize nodes={content as any} />
      </AlertBody>
      {link && (
        <Button asChild color={color} iconPosition={link.icon ? 'right' : 'none'} size="sm" className="mt-4">
          <Link href={constructUrl(link)} target={link.newTab ? '_blank' : ''} rel={link.rel?.join(',') || ''}>
            {link.text}
            {link.icon && <Icon name={link.icon} />}
          </Link>
        </Button>
      )}
    </Alert>
  );

  if (width === 'max') {
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-12 lg:px-4">
        <RenderAlert />
      </section>
    );
  }

  return <RenderAlert />;
}
