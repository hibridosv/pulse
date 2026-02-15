'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-[2px] z-20 text-danger/70" aria-hidden>{text}</span>
          <span className="absolute top-0 -left-[2px] z-20 text-accent/70" aria-hidden>{text}</span>
        </>
      )}
    </span>
  );
}

function FloatingParticle({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <div
      className="absolute rounded-full bg-primary/20 animate-float"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        animationDelay: `${delay}s`,
        animationDuration: `${4 + delay}s`,
      }}
    />
  );
}

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-bg-base via-bg-content to-bg-base p-4">
      {/* Orbs de fondo animados */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-secondary/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Partículas flotantes */}
      <FloatingParticle delay={0} size={6} x="15%" y="20%" />
      <FloatingParticle delay={1.5} size={4} x="80%" y="15%" />
      <FloatingParticle delay={0.8} size={8} x="70%" y="70%" />
      <FloatingParticle delay={2} size={5} x="25%" y="75%" />
      <FloatingParticle delay={1.2} size={3} x="50%" y="10%" />
      <FloatingParticle delay={0.5} size={7} x="90%" y="45%" />
      <FloatingParticle delay={1.8} size={4} x="10%" y="50%" />

      {/* Anillo orbital */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full border border-dashed border-primary/10 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent/60 animate-orbit" />
      </div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] md:h-[300px] md:w-[300px] rounded-full border border-dotted border-accent/10 transition-opacity duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary/60 animate-orbit-reverse" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Número 404 con glitch */}
        <div className="animate-scale-in mb-2">
          <GlitchText
            text="404"
            className="text-[8rem] md:text-[11rem] font-black leading-none bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent select-none"
          />
        </div>

        {/* Línea decorativa */}
        <div className={`mx-auto mb-6 h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-1000 ease-out ${mounted ? 'w-48 opacity-100' : 'w-0 opacity-0'}`} />

        {/* Mensaje principal */}
        <h2 className="animate-slide-up text-2xl md:text-3xl font-bold text-text-base mb-3">
          Página no encontrada
        </h2>

        {/* Sub-mensaje */}
        <p className="animate-slide-up-delay text-text-muted text-base md:text-lg mb-10 max-w-sm mx-auto leading-relaxed">
          El recurso que buscas no existe o fue movido a otra ubicación.
        </p>

        {/* Botón */}
        <div className="animate-slide-up-delay-2">
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-text-inverted shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary/30"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        {/* Código de error sutil */}
        <p className="animate-fade-in-delay mt-12 text-xs font-mono text-text-muted/40 tracking-widest uppercase">
          Error &middot; Not Found &middot; /404
        </p>
      </div>
    </div>
  );
}
