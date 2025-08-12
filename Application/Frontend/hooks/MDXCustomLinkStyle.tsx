import React from 'react';

const CustomLink = ({ 
  href, 
  children 
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a 
    href={href} 
    className="text-danger"
  >
    {children}
  </a>
);

export default CustomLink;