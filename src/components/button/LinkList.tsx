'use client';

import { dateToNumberValidate } from "@/lib/utils";
import { md5 } from "js-md5";
import { FiChevronRight } from "react-icons/fi"; // Usando una librería de iconos consistente

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
    <div className='my-5 bg-white rounded-lg shadow-md'>
      <div className="p-4 border-b">
        <h3 className="text-base font-semibold text-gray-800">{text}</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {links.map((item) => {
          if (item.name && item.link) {
            return (
              <li key={item.name} className="clickeable">
                <a
                  href={`${item.link}${separator}code=${md5(dateToNumberValidate())}`}
                  target="_blank"
                  rel="noopener noreferrer" // Buena práctica para target="_blank"
                  className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
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