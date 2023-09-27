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
            {link.icon && <Icon name={link.icon} className="text-xl" />}
          </ButtonLink>
        </Alert.Actions>
      )}
    </Alert.Root>
  );

  return (
    <>
      {width === 'max' ? (
        <section className="mx-auto w-full max-w-4xl px-4 py-12">
          <RenderAlert />
        </section>
      ) : (
        <RenderAlert />
      )}
    </>
  );
}
