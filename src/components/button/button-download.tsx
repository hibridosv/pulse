"use client"; // Marcar como Componente de Cliente

import { dateToNumberValidate } from '@/lib/utils';
import { md5 } from 'js-md5';
import { useSession } from 'next-auth/react';

export interface ButtonDownloadProps {
  href: string;
  children: any;
  titleText?: string;
  autoclass?: boolean;
  divider?: string;
  style?: string;
}

export function ButtonDownload({ href, children, titleText = "Descargar", autoclass = true, divider = "?",style = ""}: ButtonDownloadProps) {
  const { data: session } = useSession();
  const remoteUrl = session?.url; 

  if (!href || !remoteUrl) return null;

  return (
    <a target="_blank" href={encodeURI(`${remoteUrl}/${href}${divider}code=${md5(dateToNumberValidate())}`)} className={`${autoclass ? 'button-href ' : "clickeable "} ${style}`} title={titleText}>
      {children}
    </a>
  );
}