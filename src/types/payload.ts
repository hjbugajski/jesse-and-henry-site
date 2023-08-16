export interface PayloadHeroBlock {
  titleOne: string;
  titleTwo: string;
  subtitle: string;
  id?: string;
  blockName?: string;
  blockType: 'hero';
}

export interface PayloadPage {
  id: string;
  name: string;
  slug?: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: PayloadHeroBlock[];
  };
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}
