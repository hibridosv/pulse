'use client';

import { dateToNumberValidate } from "@/lib/utils";
import { md5 } from "js-md5";
import { FiChevronRight } from "react-icons/fi";

export interface LinkUrls {
  name: string;
  link: string;
  isUrl?: boolean;
}

export interface LinksListProps {
  links: LinkUrls[];
  text?: string;
  separator?: string;
}

export function LinksList(props: LinksListProps) {
  const { links, text = "Descargas", separator = '&' } = props;

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className='my-5 bg-bg-content rounded-lg shadow-sm border border-bg-subtle/50'>
      <div className="p-4 border-b border-bg-subtle">
        <h3 className="text-base font-semibold text-text-base">{text}</h3>
      </div>
      <ul className="divide-y divide-bg-subtle">
        {links.map((item, key) => {
          if (item.name && item.link) {
            return (
              <li key={key} className="clickeable">
                <a
                  href={`${item.link}${separator}code=${md5(dateToNumberValidate())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 flex justify-between items-center hover:bg-bg-subtle transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-text-base">{item.name}</span>
                  <FiChevronRight className="w-5 h-5 text-text-muted" />
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
