import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Sistema de Inventario y Facturación",
  description: "Sistema creado por Hibrido El Salvador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full bg-gray-50">
      <body className="h-full flex flex-col">
        <Providers>
          <main className="flex-grow container mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
