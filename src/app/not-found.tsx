import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-bg-base via-bg-subtle/50 to-bg-base p-4">
      <div className="text-center">
        {/* Animated Image */}
        <div className="relative mx-auto mb-6 h-64 w-64 animate-float">
          <Image
            src="/img/no_data_found.svg"
            layout="fill"
            objectFit="contain"
            alt="Ilustración de página no encontrada"
          />
        </div>

        {/* Gradient Text for 404 */}
        <h1 className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl">
          404
        </h1>

        {/* Main Message */}
        <h2 className="mb-3 text-2xl font-bold text-text-base md:text-4xl">¡Ups! Página no encontrada.</h2>

        {/* Sub-message */}
        <p className="mb-8 max-w-md text-base text-text-muted md:text-lg">
          Parece que te has perdido en el universo digital. No te preocupes, te ayudamos a encontrar el camino de
          vuelta.
        </p>

        {/* Call to Action Button */}
        <Link
          href="/dashboard"
          className="inline-block transform rounded-lg bg-primary px-8 py-3 text-lg font-semibold text-text-inverted shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/50">
          Volver al Inicio
        </Link>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-10 left-10 h-16 w-16 rounded-full bg-primary/10 blur-2xl"></div>
      <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-accent/10 blur-3xl"></div>
    </div>
  );
}
