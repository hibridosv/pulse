'use client'

import { DateRangeValues } from '@/components/button/DateRange';
import { LinkUrls } from '@/components/button/LinkList';
import { formatDate } from '@/lib/date-formats';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

export function useDownloadLink() {
    const { data: session } = useSession();
    const remoteUrl = session?.url
    const [links, setLinks] = useState<LinkUrls[]>([]);

    const addLink = useCallback((data: DateRangeValues, url: string, params?:any, maxLinks=3, nameLink="Descargar Documento" )=>{
      if (!remoteUrl) return;

        const queryParams = [];

        if (data.option) {
            queryParams.push(`option=${data.option}`);
        }
        if (data.initialDate) {
            queryParams.push(`initialDate=${data.initialDate}`);
        }
        if (data.finalDate) {
            queryParams.push(`finalDate=${data.finalDate}`);
        }
        if (params) {
            params.forEach((param: any) => {
                if (param.value !== undefined && param.value !== null) {
                    queryParams.push(`${param.name}=${param.value}`);
                }
            });
        }

        const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
        const newUrl = `${remoteUrl}/download/${url}${queryString}`; 
        
        const name = `${!data.option ? nameLink : data.option == '1' ?
                            `Fecha establecida ${formatDate(data.initialDate)}` : 
                            `Del ${formatDate(data.initialDate)} al ${formatDate(data.finalDate)}`}`

        const newLink = {"name": name, "link": encodeURI(newUrl), "isUrl": true};

        setLinks(prevLinks => {
            const updatedLinks = [...prevLinks, newLink];
            if (updatedLinks.length > maxLinks) {
                return updatedLinks.slice(updatedLinks.length - maxLinks);
            }
            return updatedLinks;
        });
    }, [remoteUrl]);

  return { links, addLink };
}