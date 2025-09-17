'use client';

import React from 'react';
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
export function Pagination(props: PaginationProps) {
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
        <span key={`ellipsis-${index}`} className="flex items-center justify-center px-2 h-10 text-sm font-medium text-text-muted">
          ...
        </span>
      );
    }

    const baseClasses = "flex items-center justify-center h-10 text-sm font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary/50";
    const numberClasses = "w-10";
    const prevNextClasses = "px-4 gap-2";

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
        {isPrev && <FiChevronLeft size={18} />}
        <span className={`${isPrev || isNext ? 'hidden sm:inline' : ''}`}>
          {link.label.replace('&laquo; Previous', 'Anterior').replace('Next &raquo;', 'Siguiente')}
        </span>
        {isNext && <FiChevronRight size={18} />}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <span className="text-sm text-text-muted">
        Mostrando{" "}
        <span className="font-semibold text-text-base">{records.from}</span> a <span className="font-semibold text-text-base">{records.to}</span> de <span className="font-semibold text-text-base">{records.total}</span> Registros
      </span>

      <nav aria-label="Paginación">
        <div className="flex items-center justify-center gap-2">
          {truncatedLinks.map(renderPageElement)}
        </div>
      </nav>
    </div>
  );
}