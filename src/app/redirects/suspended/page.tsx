'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return offset;
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgb(var(--color-danger)) 1px, transparent 1px),
                           linear-gradient(90deg, rgb(var(--color-danger)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

function ConstellationDots() {
  const dots = [
    { x: '10%', y: '15%', size: 3, delay: 0 },
    { x: '85%', y: '20%', size: 2, delay: 0.6 },
    { x: '78%', y: '75%', size: 3, delay: 1.4 },
    { x: '18%', y: '80%', size: 2, delay: 0.9 },
    { x: '50%', y: '8%', size: 3, delay: 1.6 },
    { x: '90%', y: '50%', size: 2, delay: 2.1 },
    { x: '6%', y: '52%', size: 3, delay: 0.4 },
    { x: '40%', y: '88%', size: 2, delay: 1.9 },
  ];
  return (
    <>
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-danger/30"
          style={{
            width: dot.size, height: dot.size,
            left: dot.x, top: dot.y,
            animation: `twinkle ${2 + dot.delay}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

function ScanLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-danger/30 to-transparent"
        style={{ animation: 'scanDown 3.5s ease-in-out infinite' }}
      />
    </div>
  );
}

export default function SuspendedPage() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Tu cuenta ha sido suspendida. Contacta al administrador para más información.';
  const parallax = useMouseParallax();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) { setTypedText(fullText.slice(0, i)); i++; }
      else clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleLogout = () => {
    document.cookie = 'tenant-status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg-base p-4">
      <style jsx>{`
        @keyframes scanDown {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shieldPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgb(var(--color-danger) / 0.2); }
          50% { box-shadow: 0 0 0 12px rgb(var(--color-danger) / 0); }
        }
        @keyframes lockRotate {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(-8deg); }
          20% { transform: rotate(8deg); }
          30% { transform: rotate(-5deg); }
          40% { transform: rotate(5deg); }
          50% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      <GridBackground />
      <ConstellationDots />

      <div
        className="absolute top-1/3 left-1/5 h-80 w-80 rounded-full bg-danger/[0.03] blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${parallax.x * -15}px, ${parallax.y * -15}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${parallax.x * 20}px, ${parallax.y * 20}px)` }}
      />

      {/* Anillos */}
      <div
        className={`absolute top-1/2 left-1/2 h-[340px] w-[340px] md:h-[440px] md:w-[440px] rounded-full border border-danger/[0.06] transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ transform: `translate(calc(-50% + ${parallax.x * 8}px), calc(-50% + ${parallax.y * 8}px))` }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-danger/50 animate-orbit" />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 h-[240px] w-[240px] md:h-[320px] md:w-[320px] rounded-full border border-dashed border-danger/[0.06] transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ transform: `translate(calc(-50% + ${parallax.x * -5}px), calc(-50% + ${parallax.y * -5}px))` }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-1 w-1 rounded-full bg-primary/40 animate-orbit-reverse" />
      </div>

      {/* Contenido */}
      <div
        className="relative z-10 text-center max-w-lg mx-auto transition-transform duration-700 ease-out"
        style={{ transform: `translate(${parallax.x * 5}px, ${parallax.y * 5}px)` }}
      >
        <div className={`relative bg-bg-content/60 backdrop-blur-xl rounded-3xl border border-bg-subtle/50 shadow-2xl shadow-danger/[0.06] p-8 md:p-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <ScanLine />

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/10 border border-danger/20 mb-8 transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            <span className="text-xs font-medium text-danger tracking-wide uppercase">Suspendida</span>
          </div>

          {/* Icono de candado */}
          <div className={`mx-auto mb-6 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div
              className="mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full bg-danger/10 flex items-center justify-center"
              style={{ animation: mounted ? 'shieldPulse 2.5s ease-in-out infinite' : 'none' }}
            >
              <svg
                className="w-12 h-12 md:w-14 md:h-14 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                style={{ animation: mounted ? 'lockRotate 3s ease-in-out 1s 1' : 'none' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>

          {/* Línea decorativa */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`h-px bg-gradient-to-r from-transparent to-danger/30 transition-all duration-1000 delay-500 ${mounted ? 'w-16' : 'w-0'}`} />
            <div className={`w-2 h-2 rounded-full bg-danger transition-all duration-500 delay-700 ${mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
            <div className={`h-px bg-gradient-to-l from-transparent to-danger/30 transition-all duration-1000 delay-500 ${mounted ? 'w-16' : 'w-0'}`} />
          </div>

          {/* Título */}
          <h1 className={`text-2xl md:text-3xl font-bold text-text-base mb-4 transition-all duration-600 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Cuenta Suspendida
          </h1>

          {/* Typewriter */}
          <div className={`h-14 flex items-center justify-center transition-opacity duration-500 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-text-muted text-sm md:text-base max-w-sm leading-relaxed">
              {typedText}
              <span
                className="inline-block w-0.5 h-4 bg-danger ml-0.5 align-middle"
                style={{ animation: 'cursorBlink 0.8s step-end infinite' }}
              />
            </p>
          </div>

          {/* Botón */}
          <div className={`mt-8 transition-all duration-600 delay-[900ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleLogout}
              className="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-text-inverted shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-danger/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="relative">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        <p className={`mt-8 text-[10px] font-mono text-text-muted/25 tracking-[0.2em] uppercase transition-all duration-700 delay-[1100ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          Estado &middot; Suspended &middot; Acceso denegado
        </p>
      </div>
    </div>
  );
}
