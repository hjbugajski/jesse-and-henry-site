export const GLOBALS = `#graphql
  query Globals {
    NavMenu {
      links {
        link {
          text
          newTab
          reference {
            slug
          }
          type
          url
        }
      }
    }
  }
`;
