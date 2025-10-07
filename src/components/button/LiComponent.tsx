import Link from 'next/link';
import React from 'react';

export interface LiComponentI {
  onClick?: () => void;
  href?: string;
  link?: string;
  text?: string;
  content?: React.ReactNode;
  target?: string;
}

export function LiComponent(props: LiComponentI) {
  const { text, onClick, href, link, target="_blank", content } = props;

  const commonClasses = "flex justify-between items-center p-3 hover:bg-bg-subtle rounded-md transition-colors duration-150";
  const iconSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  if (href) {
    return (
      <li>
        <a href={href} className={`${commonClasses} clickeable`} target={target}>
          <span className="font-medium text-text-base">{text}{content}</span>
          {iconSvg}
        </a>
      </li>
    );
  }

  if (link) {
    return (
      <li>
        <Link href={link} className={`${commonClasses} clickeable`}>
          <span className="font-medium text-text-base">{text}{content}</span>
          {iconSvg}
        </Link>
      </li>
    );
  }

  if (onClick) {
    return (
      <li>
        <button type="button" onClick={onClick} className={`${commonClasses} w-full text-left clickeable`}>
          <span className="font-medium text-text-base">{text}{content}</span>
          {iconSvg}
        </button>
      </li>
    );
  }

  // Default case if neither href nor onClick is provided
  return (
    <li>
      <div className={commonClasses}>
        <span className="font-medium text-text-base">{text}{content}</span>
        {iconSvg}
      </div>
    </li>
  );
}