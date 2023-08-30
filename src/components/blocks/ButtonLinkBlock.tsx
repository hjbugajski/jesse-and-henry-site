import { PayloadButtonLinkBlock } from '@/types/payload';

import { ButtonLink } from '../Button';
import Icon from '../Icon';

export default function ButtonLinkBlock({ block }: { block: PayloadButtonLinkBlock }) {
  const { color, icon, newTab, reference, text, type, url } = block;

  return (
    <ButtonLink
      href={type === 'external' ? url : `/${reference.slug}`}
      target={newTab ? '_blank' : ''}
      rel={newTab ? 'noopener noreferrer' : ''}
      color={color}
      iconPosition="right"
      size="md"
      className="w-fit"
    >
      {text}
      {icon && <Icon name={icon} className="text-2xl" />}
    </ButtonLink>
  );
}
