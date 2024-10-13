// ClientLayout.tsx
"use client";
import Sidebar from "components/sidebar";
import { UserRoute } from "routes";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import React, { FC, ReactNode, useState } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

const Layout: FC<ClientLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar routes={UserRoute} open={open} setOpen={setOpen} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main className="mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[323px]">
          {/* Routes */}
          <div>
            <Navbar onOpenSidenav={() => setOpen(!open)} />
            <div className="mx-auto min-h-screen p-2 pt-[10px] md:p-2">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
