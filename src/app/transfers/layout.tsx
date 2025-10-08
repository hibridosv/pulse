
'use client'

import { Navbar } from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="w-full h-full">
        <Suspense fallback={<LoadingPage />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
