import { ButtonLink } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadButtonLinkBlock } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function ButtonLinkBlock({ block }: { block: PayloadButtonLinkBlock }) {
  const { color, link } = block;

  return (
    <ButtonLink
      href={constructUrl(link)}
      target={link.newTab ? '_blank' : ''}
      rel={link.rel?.join(',') || ''}
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
