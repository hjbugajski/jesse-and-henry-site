import Serialize from '@/components/Serialize';
import * as Alert from '@/lib/components/Alert';
import { ButtonLink } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadAlertBlock } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function AlertBlock({ block }: { block: PayloadAlertBlock }) {
  const { link, color, content, icon, title, width } = block;

  const RenderAlert = () => (
    <Alert.Root color={color} icon={icon}>
      <Alert.Title>{title}</Alert.Title>
      <Alert.Body>
        <Serialize nodes={content as any} />
      </Alert.Body>
      {link && (
        <Alert.Actions>
          <ButtonLink
            href={constructUrl(link)}
            target={link.newTab ? '_blank' : ''}
            rel={link.rel?.join(',') || ''}
            className="w-fit"
            color={color}
            iconPosition={link.icon ? 'right' : 'none'}
            size="sm"
          >
            {link.text}
            {link.icon && <Icon name={link.icon} />}
          </ButtonLink>
        </Alert.Actions>
      )}
    </Alert.Root>
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
