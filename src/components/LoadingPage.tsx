'use client';

import { LuLoaderCircle } from "react-icons/lu";

export const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-main bg-opacity-75">
      <LuLoaderCircle className="animate-spin text-primary" size={64} />
      <p className="mt-4 text-lg text-text-main">Cargando...</p>
    </div>
  );
};
