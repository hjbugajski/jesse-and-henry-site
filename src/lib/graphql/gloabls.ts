export const GLOBALS = `#graphql
  query Globals {
    Navigation {
      links {
        text
        newTab
        relationship {
          slug
        }
        type
        url
        anchor
      }
    }
  }
`;
