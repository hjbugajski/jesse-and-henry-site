import AlertBlock from '@/components/blocks/AlertBlock';
import ButtonLinkBlock from '@/components/blocks/ButtonLinkBlock';
import ContentBlock from '@/components/blocks/ContentBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import SectionBlock from '@/components/blocks/SectionBlock';
import { PayloadAlertBlock, PayloadContentBlock, PayloadHeroBlock, PayloadSectionBlock } from '@/lib/types/payload';

const blocks = {
  alert: AlertBlock,
  buttonLink: ButtonLinkBlock,
  content: ContentBlock,
  hero: HeroBlock,
  section: SectionBlock,
};

export function Blocks({
  block,
}: {
  block: PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock;
}) {
  const RenderBlock = blocks[block.blockType];

  // @ts-expect-error block type is correct
  return RenderBlock ? <RenderBlock block={block} /> : null;
}
