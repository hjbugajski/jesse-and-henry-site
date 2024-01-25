import { PayloadFieldLink } from '../types/payload';

export function constructUrl(link: PayloadFieldLink) {
  if (link.type === 'external') {
    return link.url || '';
  }

  const slug = link.relationship?.slug ? `/${link.relationship.slug}` : '';
  const anchor = link.anchor;

  return `${slug === '/home' ? '/' : slug}${anchor ? `#${anchor}` : ''}`;
}
