import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AlertCircleIcon } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Code } from '@/components/ui/code';
import { slugify } from '@/lib/utils';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';

// function Table({ data }) {
//   const headers = data.headers.map((header, index) => (
//     <th key={index}>{header}</th>
//   ));
//   const rows = data.rows.map((row, index) => (
//     <tr key={index}>
//       {row.map((cell, cellIndex) => (
//         <td key={cellIndex}>{cell}</td>
//       ))}
//     </tr>
//   ));

//   return (
//     <table>
//       <thead>
//         <tr>{headers}</tr>
//       </thead>
//       <tbody>{rows}</tbody>
//     </table>
//   );
// }

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
}

function CustomLink({ href, children, ...rest }: CustomLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a href={href} {...rest}>{children}</a>;
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

function RoundedImage({alt, ...rest}: React.ComponentProps<typeof Image>) {
  return <Image alt={alt} {...rest} className="rounded-lg" />;
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug, className: 'scroll-mt-20' },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const customComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  // Table,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertCircleIcon,
};

export function CustomMDX({components, ...rest}: MDXRemoteProps) {
  return (
    <MDXRemote
      {...rest}
      components={{ ...customComponents, ...(components || {}) }}
    />
  );
}
