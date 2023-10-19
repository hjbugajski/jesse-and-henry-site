import { PayloadLinkField } from '../types/payload';

export function constructUrl(link: PayloadLinkField) {
  if (link.type === 'external') {
    return link.url;
  }

  const {
    relationship: { slug },
    anchor,
  } = link;

  return `/${slug === 'home' ? '' : slug}${anchor ? `#${anchor}` : ''}`;
}
