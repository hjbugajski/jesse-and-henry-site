export const BUTTON_LINK = `
... on ButtonLink {
  text
  icon
  color
  type
  newTab
  reference {
    slug
  }
  url
  id
  blockType
}
`;

export const CONTENT = `
... on Content {
  blockType
  content
  width
}
`;

export const HERO = `
...on Hero {
  titleOne
  titleTwo
  subtitle
  blockType
}
`;

export const SECTION = `
...on Section {
  id
  title
  description
  border
  layout {
    ${CONTENT}
    ${BUTTON_LINK}
  }
  blockType
}
`;
