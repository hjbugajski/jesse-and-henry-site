import Serialize from '@/components/Serialize';
import * as Alert from '@/lib/components/Alert';
import { ButtonLink } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadAlertBlock } from '@/lib/types/payload';

export default function AlertBlock({ block }: { block: PayloadAlertBlock }) {
  const { alertLink: link, alertColor: color, content, alertIcon: icon, title, alertWidth: width } = block;

  const RenderAlert = () => (
    <Alert.Root color={color} icon={icon}>
      <Alert.Title>{title}</Alert.Title>
      <Alert.Body>
        <Serialize nodes={content as any} />
      </Alert.Body>
      {link && (
        <Alert.Actions>
          <ButtonLink
            href={link.type === 'external' ? link.url : `/${link.reference.value.slug}`}
            target={link.newTab ? '_blank' : ''}
            rel={link.newTab ? 'noopener noreferrer' : ''}
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
      <section className="mx-auto w-full max-w-4xl px-4 py-12 md:px-8 md-lg:px-4">
        <RenderAlert />
      </section>
    );
  }

  return <RenderAlert />;
}
