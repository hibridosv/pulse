
'use client'

import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto px-1 my-auto ">
      <div>
        <Navbar />
      </div>
      <div className="w-full h-full">
        {children}
      </div>
  </div>
  );
};

export default Layout;
