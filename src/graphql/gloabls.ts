export const GLOBALS = `#graphql
  query Globals {
    NavMenu {
      links {
        link {
          text
          newTab
          reference {
            relationTo
            value {
              ... on Page {
                slug
              }
              ... on ProtectedPage {
                slug
              }
            }
          }
          type
          url
        }
      }
    }
  }
`;
