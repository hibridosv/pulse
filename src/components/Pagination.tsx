"use client";
import React from "react";

// Define interfaces for the paginator.json structure
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatorData {
  current_page: number;
  data: any[]; // Can be more specific if needed, but for pagination, any[] is fine
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
  records?: PaginatorData; // Use the defined interface
  handlePageNumber?: (url: string) => any;
}

export function Pagination(props: PaginationProps) {
  const { records, handlePageNumber } = props;

  if (!records || !records.links) return <></>;

  if (records.total === 0) return <></>;

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-cyan-700">
        Mostrando{" "}
        <span className="font-semibold text-cyan-900">
          {records.from}
        </span>{" "}
        a{" "}
        <span className="font-semibold text-cyan-900">
          {records.to}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-cyan-900">
          {records.total}
        </span>{" "}
        Registros
      </span>
      {records.total > records.per_page && (
        <div className="inline-flex mt-2 xs:mt-0">
          {records.links.map((link, index) => {
            const isPrevNext = link.label.includes('Anterior') || link.label.includes('Siguiente');
            const isDisabled = !link.url;

            let buttonClasses = "inline-flex items-center py-2 px-4 text-sm font-medium text-white mx-0.5";

            if (link.active) {
              buttonClasses += " bg-cyan-500";
            } else if (isDisabled) {
              buttonClasses += " bg-gray-400 cursor-not-allowed"; // Consistent disabled style
            } else {
              buttonClasses += " bg-cyan-800 hover:bg-cyan-900";
            }

            if (link.label.includes('Anterior')) {
              buttonClasses += " rounded-l";
            } else if (link.label.includes('Siguiente')) {
              buttonClasses += " rounded-r border-0 border-l border-cyan-700";
            }

            return (
              <button
                key={link.label + index}
                onClick={() => handlePageNumber?.(link.url!)}
                className={buttonClasses}
                disabled={isDisabled}
              >
                {link.label.replace('&laquo; Previous', 'Anterior').replace('Next &raquo;', 'Siguiente')}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

