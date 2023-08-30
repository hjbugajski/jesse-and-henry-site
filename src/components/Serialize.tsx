import { Fragment } from 'react';

import { Text } from 'slate';

interface Node {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
}

interface SerializeProps {
  nodes: Node[] | undefined;
}

export default function Serialize({ nodes }: SerializeProps) {
  return !nodes ? null : (
    <Fragment>
      {nodes.map((node, i) => {
        if (Text.isText(node)) {
          let text: any = node.text;

          if (node.bold) {
            text = <strong>{text}</strong>;
          }

          if (node.italic) {
            text = <em>{text}</em>;
          }

          if (node.underline) {
            text = <span className="underline underline-offset-4">{text}</span>;
          }

          if (node.strikethrough) {
            text = <span className="line-through">{text}</span>;
          }

          if (node.code) {
            text = <code>{text}</code>;
          }

          return <Fragment key={i}>{text}</Fragment>;
        }

        switch (node.type) {
          case 'h1':
            return (
              <h1 key={i} className="mb-6 mt-9 text-3xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h1>
            );
          case 'h2':
            return (
              <h2 key={i} className="mb-4 mt-7 text-2xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mb-3 mt-6 text-xl first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h3>
            );
          case 'h4':
            return (
              <h4 key={i} className="mb-2 mt-5 text-lg first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h4>
            );
          case 'h5':
            return (
              <h5 key={i} className="mb-2 mt-5 text-base first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h5>
            );
          case 'h6':
            return (
              <h6 key={i} className="mb-2 mt-5 text-sm first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </h6>
            );
          case 'ul':
            return (
              <ul key={i} className="my-2 list-disc space-y-1 pl-8 first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="my-2 list-decimal space-y-1 pl-8 first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </ol>
            );
          case 'li':
            return (
              <li key={i}>
                <Serialize nodes={node.children} />
              </li>
            );
          default:
            return (
              <p key={i} className="my-2 first:mt-0 last:mb-0">
                <Serialize nodes={node.children} />
              </p>
            );
        }
      })}
    </Fragment>
  );
}
