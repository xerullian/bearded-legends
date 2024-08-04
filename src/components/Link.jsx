import React from 'react';

export default function Link({ className, children, href }) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
