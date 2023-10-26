import { ButtonLink } from '@/lib/components/Button';
import Icon from '@/lib/components/Icon';
import { PayloadButtonLinksBlock } from '@/lib/types/payload';
import { constructUrl } from '@/lib/utils/link';

export default function ButtonLinksBlock({ block }: { block: PayloadButtonLinksBlock }) {
  const { links } = block;

  return (
    <ul className="flex flex-row flex-wrap gap-4">
      {links?.map((link, i) => (
        <li key={i}>
          <ButtonLink
            href={constructUrl(link)}
            target={link.newTab ? '_blank' : ''}
            rel={link.rel?.join(',') || ''}
            color={link.color}
            iconPosition="right"
            size="md"
            className="w-fit"
          >
            {link.text}
            {link.icon && <Icon name={link.icon} />}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
