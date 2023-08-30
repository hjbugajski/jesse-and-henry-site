import { CONTENT, HERO, SECTION } from './blocks';

export const PAGE = `
  query Page($slug: String) {
    Pages(where: { slug: { equals: $slug}, _status: { equals: published } }) {
      docs {
        slug
        name
        meta {
          title
          description
        }
        content {
          layout {
            ${CONTENT}
            ${HERO}
            ${SECTION}
          }
        }
      }
    }
  }
`;

export const PAGES = `
  query Pages {
    Pages(limit: 500) {
      docs {
        slug
      }
    }
  }
`;
