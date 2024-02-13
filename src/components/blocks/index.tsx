import { FC } from 'react';

import BlockAlert from '@/components/blocks/Alert';
import BlockButtonLink from '@/components/blocks/ButtonLink';
import BlockGallery from '@/components/blocks/Gallery';
import BlockHero from '@/components/blocks/Hero';
import BlockSection from '@/components/blocks/Section';
import {
  PayloadBlockAlert,
  PayloadBlockButtonLink,
  PayloadBlockFaq,
  PayloadBlockGallery,
  PayloadBlockHero,
  PayloadBlockImageLink,
  PayloadBlockSection,
} from '@/lib/types/payload';

import BlockFaq from './Faq';
import BlockImageLink from './ImageLink';
import BlockRegistry from './Registry';

const blocks = {
  alert: BlockAlert,
  buttonLink: BlockButtonLink,
  faq: BlockFaq,
  gallery: BlockGallery,
  hero: BlockHero,
  imageLink: BlockImageLink,
  registry: BlockRegistry,
  section: BlockSection,
};

export function Blocks({
  blockType,
  ...props
}:
  | PayloadBlockAlert
  | PayloadBlockButtonLink
  | PayloadBlockFaq
  | PayloadBlockGallery
  | PayloadBlockHero
  | PayloadBlockImageLink
  | PayloadBlockSection) {
  const RenderBlock: FC<any> = blocks[blockType];

  return RenderBlock ? <RenderBlock {...props} /> : null;
}
