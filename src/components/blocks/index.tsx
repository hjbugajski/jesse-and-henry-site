import AlertBlock from '@/components/blocks/AlertBlock';
import ButtonLinkBlock from '@/components/blocks/ButtonLinksBlock';
import ContentBlock from '@/components/blocks/ContentBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import SectionBlock from '@/components/blocks/SectionBlock';
import {
  PayloadAlertBlock,
  PayloadContentBlock,
  PayloadHeroBlock,
  PayloadPhotosBlock,
  PayloadSectionBlock,
} from '@/lib/types/payload';

import PhotosBlock from './PhotosBlock';

const blocks = {
  alert: AlertBlock,
  buttonLinks: ButtonLinkBlock,
  content: ContentBlock,
  hero: HeroBlock,
  photos: PhotosBlock,
  section: SectionBlock,
};

export function Blocks({
  block,
}: {
  block: PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock | PayloadPhotosBlock;
}) {
  const RenderBlock = blocks[block.blockType];

  // @ts-expect-error block type is correct
  return RenderBlock ? <RenderBlock block={block} /> : null;
}
