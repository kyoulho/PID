// layout.tsx
import type { FC, PropsWithChildren } from "react";
import React from "react";

import "styles/App.css";
import "styles/Contact.css";
import "styles/MiniCalendar.css";
import "styles/index.css";
import { Metadata } from "next";
import { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";

export const metadata: Metadata = {
  title: "나의 투자 일지",
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`,
        type: "image/x-icon",
      },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: ViewportLayout = {
  initialScale: 1,
  width: "device-width",
  themeColor: "#000000",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body id="root">{children}</body>
    </html>
  );
};

export default RootLayout;
