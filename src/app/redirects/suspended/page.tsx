'use client';
import { signOut } from 'next-auth/react';
import { BiBlock } from 'react-icons/bi';

export default function SuspendedPage() {
  const handleLogout = () => {
    document.cookie = 'tenant-status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-6">
      <div className="bg-bg-content rounded-2xl shadow-2xl border border-bg-subtle/50 p-10 max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mb-6">
          <BiBlock className="text-danger" size={40} />
        </div>
        <h1 className="text-2xl font-bold text-text-base mb-3">Cuenta Suspendida</h1>
        <p className="text-text-muted mb-8">
          Tu cuenta ha sido suspendida. Por favor, contacta al administrador del sistema para más información.
        </p>
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-text-inverted bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
