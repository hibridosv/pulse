'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// --- Interfaces (sin cambios) ---
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}
interface PaginatorData {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
export interface PaginationProps {
  records?: PaginatorData;
  handlePageNumber?: (url: string) => any;
}

// --- Nueva Función para truncar los enlaces ---
const getTruncatedLinks = (records: PaginatorData): Link[] => {
  const { current_page, last_page, path, links } = records;
  const maxVisible = 7; // Máximo de elementos visibles (Anterior, 1, ..., 4, 5, 6, ..., 10, Siguiente)

  if (last_page <= maxVisible) {
    return links; // Si hay pocas páginas, muéstralas todas
  }

  const truncatedLinks: Link[] = [];
  const sideWidth = 1; // Páginas a cada lado de la actual

  // 1. Botón "Anterior"
  truncatedLinks.push(links[0]);

  // 2. Primera página
  truncatedLinks.push({ url: `${path}?page=1`, label: '1', active: current_page === 1 });

  // 3. Elipsis inicial si es necesario
  if (current_page > sideWidth + 2) {
    truncatedLinks.push({ url: null, label: '...', active: false });
  }

  // 4. Páginas centrales
  const startPage = Math.max(2, current_page - sideWidth);
  const endPage = Math.min(last_page - 1, current_page + sideWidth);

  for (let i = startPage; i <= endPage; i++) {
    truncatedLinks.push({ url: `${path}?page=${i}`, label: `${i}`, active: i === current_page });
  }

  // 5. Elipsis final si es necesario
  if (current_page < last_page - (sideWidth + 1)) {
    truncatedLinks.push({ url: null, label: '...', active: false });
  }

  // 6. Última página
  truncatedLinks.push({ url: `${path}?page=${last_page}`, label: `${last_page}`, active: current_page === last_page });

  // 7. Botón "Siguiente"
  truncatedLinks.push(links[links.length - 1]);

  return truncatedLinks;
};


// --- Componente Principal ---
export function PaginationMin(props: PaginationProps) {
  const { records, handlePageNumber } = props;

  if (!records || !records.links || records.total <= records.per_page) {
    return null;
  }

  const truncatedLinks = getTruncatedLinks(records);

  const renderPageElement = (link: Link, index: number) => {
    const isPrev = link.label.includes('Anterior');
    const isNext = link.label.includes('Siguiente');
    const isEllipsis = link.label === '...';

    if (isEllipsis) {
      return (
        <span key={`ellipsis-${index}`} className="flex items-center justify-center px-1 h-7 text-xs text-text-muted">
          ...
        </span>
      );
    }

    const baseClasses = "flex items-center justify-center h-7 text-xs font-medium rounded transition-colors duration-150 focus:outline-none";
    const numberClasses = "w-7";
    const prevNextClasses = "px-2 gap-1";

    let stateClasses = '';
    if (link.active) {
      stateClasses = 'bg-primary border-primary text-text-inverted z-10 shadow-sm';
    } else if (!link.url) {
      stateClasses = 'text-text-muted cursor-not-allowed bg-bg-subtle/50';
    } else {
      stateClasses = 'bg-bg-content border border-bg-subtle text-text-base hover:bg-bg-subtle';
    }

    return (
      <button
        key={link.label + index}
        onClick={() => link.url && handlePageNumber?.(link.url)}
        className={`${baseClasses} ${isPrev || isNext ? prevNextClasses : numberClasses} ${stateClasses}`}
        disabled={!link.url}
      >
        {isPrev && <FiChevronLeft size={14} />}
        {!isPrev && !isNext && link.label}
        {isNext && <FiChevronRight size={14} />}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      {truncatedLinks.map(renderPageElement)}
    </div>
  );
}