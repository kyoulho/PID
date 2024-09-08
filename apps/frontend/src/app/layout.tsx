import "../styles/globals.css";
import { ReactNode } from "react";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Header } from "@/components/organisms/Header";

export const metadata = {
  title: "Paradise Investment Diary",
  description: "Your Investment Companion",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="p-4 bg-gray-100 flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
