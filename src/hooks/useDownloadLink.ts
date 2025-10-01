'use client'

import { DateRangeValues } from '@/components/button/DateRange';
import { LinkUrls } from '@/components/button/LinkList';
import { formatDate } from '@/lib/date-formats';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function useDownloadLink() {
    const { data: session } = useSession();
    const remoteUrl = session?.url
    const [links, setLinks] = useState<LinkUrls[]>([]);

    const addLink = (listLinks: LinkUrls[], data: DateRangeValues, url: string, params?:any, maxLinks=3, nameLink="Descargar Documento" )=>{
        if (listLinks.length >= maxLinks) listLinks.shift()
        let getParams = params && params?.map((param: any) => `&${param.name}=${param.value}`).join('');
        const newUrl = `${remoteUrl}/download/${url}?${data.option ? `option=${data.option}` : ``}${data.initialDate ? `&initialDate=${data.initialDate}` : ``}${data.finalDate ? `&finalDate=${data.finalDate}` : ``}${params ? `${getParams}` : ``}` 
        
        const name = `${!data.option ? nameLink : data.option == '1' ?
                            `Fecha establecida ${formatDate(data.initialDate)}` : 
                            `Del ${formatDate(data.initialDate)} al ${formatDate(data.finalDate)}`}`

        links.push({"name": name, 
                    "link": encodeURI(newUrl), 
                    "isUrl": true})
        setLinks(links)
    }

  return { links, addLink };
}