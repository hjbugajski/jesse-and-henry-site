import { ButtonLink } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadButtonLinkBlock } from '@/lib/types/payload';

export default function ButtonLinkBlock({ block }: { block: PayloadButtonLinkBlock }) {
  const { color, link } = block;

  return (
    <ButtonLink
      href={link.type === 'external' ? link.url : `/${link.reference.slug}`}
      target={link.newTab ? '_blank' : ''}
      rel={link.newTab ? 'noopener noreferrer' : ''}
      color={color}
      iconPosition="right"
      size="md"
      className="w-fit"
    >
      {link.text}
      {link.icon && <Icon name={link.icon} />}
    </ButtonLink>
  );
}
