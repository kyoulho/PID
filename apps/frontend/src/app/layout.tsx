import React, { ReactNode } from "react";
import AppWrappers from "./AppWrappers";

export default function RootLayout({ children }: { children: ReactNode }) {
  console.log("루트 레이아웃");
  return (
    <html lang="ko">
      <body id={"root"}>
        <AppWrappers>{children}</AppWrappers>
      </body>
    </html>
  );
}
