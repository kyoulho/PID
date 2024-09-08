import "../styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Paradise Investment Diary",
  description: "Your Investment Companion",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
