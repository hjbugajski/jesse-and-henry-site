export interface PayloadAlertBlock {
  title: string;
  alertIcon: string;
  content: {
    [k: string]: unknown;
  }[];
  alertColor: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  alertLink: {
    type: 'reference' | 'external';
    newTab?: boolean;
    text: string;
    reference:
      | {
          value: PayloadPage;
          relationTo: 'pages';
        }
      | {
          value: PayloadProtectedPage;
          relationTo: 'protected-pages';
        };
    url: string;
    icon?: string;
  };
  alertWidth?: 'full' | 'max';
  id?: string;
  blockName?: string;
  blockType: 'alert';
}

export interface PayloadButtonLinkBlock {
  icon?: string;
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  link: {
    type: 'reference' | 'external';
    newTab?: boolean;
    text: string;
    reference:
      | {
          value: PayloadPage;
          relationTo: 'pages';
        }
      | {
          value: PayloadProtectedPage;
          relationTo: 'protected-pages';
        };
    url: string;
    icon?: string;
  };
  id?: string;
  blockName?: string;
  blockType: 'buttonLink';
}

export interface PayloadContentBlock {
  width?: 'full' | 'max';
  content: {
    [k: string]: unknown;
  }[];
  id?: string;
  blockName?: string;
  blockType: 'content';
}

export interface PayloadHeroBlock {
  titleOne: string;
  titleTwo: string;
  subtitle: string;
  id?: string;
  blockName?: string;
  blockType: 'hero';
}

export interface PayloadSectionBlock {
  id: string;
  title: string;
  description?: {
    [k: string]: unknown;
  }[];
  border: 'none' | 'left' | 'right';
  layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadButtonLinkBlock)[];
  blockName?: string;
  blockType: 'section';
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
    layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock)[];
  };
  _status?: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface PayloadProtectedPage {
  id: string;
  name: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock)[];
  };
  slug?: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}

export interface PayloadNavMenu {
  id: string;
  links?: {
    link: {
      type: 'reference' | 'external';
      newTab?: boolean;
      text: string;
      reference:
        | {
            value: PayloadPage;
            relationTo: 'pages';
          }
        | {
            value: PayloadProtectedPage;
            relationTo: 'protected-pages';
          };
      url: string;
      icon?: string;
    };
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}

export interface PayloadApiMe {
  user: {
    id: string;
    email: string;
    _verified: boolean;
    createdAt: string;
    updatedAt: string;
    _strategy: string;
  };
  collection: string;
  token: string;
  exp: number;
}
