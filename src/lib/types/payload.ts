export type PayloadRsvpFields = 'rsvpWelcomeParty' | 'rsvpRehearsalDinner' | 'rsvpWeddingDay' | 'rsvpPoolDay';

export type PayloadRsvpStatus = 'accept' | 'decline' | null;

export type PayloadLinkField = {
  text: string;
  icon?: string;
  type: 'internal' | 'external';
  relationship: PayloadPage;
  anchor?: string;
  url: string;
  rel?: 'noreferrer'[];
  newTab?: boolean;
  id?: string;
};

export interface PayloadParty {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  code?: string;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadSide {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadRelation {
  id: string;
  value: string;
  color?: 'green' | 'teal' | 'cyan' | 'blue' | 'violet' | 'purple' | 'plum' | 'pink' | 'red' | 'orange';
  sort?: number;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadPage {
  id: string;
  slug?: string;
  protected?: boolean;
  name: string;
  meta: {
    title: string;
    description: string;
  };
  content: {
    layout?: (PayloadAlertBlock | PayloadContentBlock | PayloadHeroBlock | PayloadSectionBlock)[];
  };
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}

export interface PayloadAlertBlock {
  title: string;
  icon: string;
  content: {
    [k: string]: unknown;
  }[];
  color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  action?: boolean;
  link?: PayloadLinkField;
  width?: 'full' | 'max';
  id?: string;
  blockName?: string;
  blockType: 'alert';
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
  image: PayloadMedia;
  id?: string;
  blockName?: string;
  blockType: 'hero';
}

export interface PayloadPhotosBlock {
  photos: PayloadMedia[];
  id?: string;
  blockName?: string;
  blockType: 'photos';
}

export interface PayloadSectionBlock {
  anchorId: string;
  title: string;
  description?: {
    [k: string]: unknown;
  }[];
  border: boolean;
  layout?: (PayloadAlertBlock | PayloadButtonLinksBlock | PayloadContentBlock | PayloadPhotosBlock)[];
  id?: string;
  blockName?: string;
  blockType: 'section';
}

export interface PayloadButtonLinksBlock {
  links: (PayloadLinkField & {
    color: 'neutral' | 'neutral-variant' | 'primary' | 'secondary' | 'tertiary' | 'danger';
  })[];
  id?: string;
  blockName?: string;
  blockType: 'buttonLinks';
}

export interface PayloadNavigation {
  links?: PayloadLinkField[] | undefined;
}

export interface PayloadMedia {
  id: string;
  alt: string;
  dataUrl: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    preview: {
      url: string;
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
    };
  };
}

export interface PayloadUser {
  id: string;
  roles: ('admin' | 'public')[];
  updatedAt: string;
  createdAt: string;
  email: string;
}

export interface PayloadGuest {
  id: string;
  first?: string;
  middle?: string;
  last?: string;
  rsvpWelcomeParty?: 'accept' | 'decline';
  rsvpRehearsalDinner?: 'accept' | 'decline';
  rsvpWeddingDay?: 'accept' | 'decline';
  rsvpPoolDay?: 'accept' | 'decline';
  legalName?: string | null;
  dateOfBirth?: string | null;
  countryOfBirth?: string | null;
  allergies?: string | null;
  transportationToVenue?: ('yes' | 'no') | null;
  transportationFromVenue?: ('yes' | 'no') | null;
  updatedAt: string;
  createdAt: string;
}

export interface PayloadApiLogin<T = PayloadUser> {
  exp: number;
  message: string;
  token: string;
  user: T;
}

export interface PayloadApiLogout {
  message: string;
}

export interface PayloadApiMe<T = PayloadUser> {
  user: T;
  collection: string;
  token: string;
  exp: number;
}

export interface PayloadApi<T = any> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
