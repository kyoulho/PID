import React, { ReactNode } from "react";
import AppWrappers from "./AppWrappers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body id={"root"}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
