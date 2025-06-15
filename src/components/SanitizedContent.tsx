
import React from 'react';
import DOMPurify from 'dompurify';

interface SanitizedContentProps {
  html: string;
  className?: string;
}

const SanitizedContent: React.FC<SanitizedContentProps> = ({ html, className }) => {
  const sanitizedHtml = DOMPurify.sanitize(html);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default SanitizedContent;
