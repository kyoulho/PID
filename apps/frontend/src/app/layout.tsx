// layout.tsx
import type { FC, PropsWithChildren } from "react";
import React from "react";
import dynamic from "next/dynamic";

import "styles/App.css";
import "styles/Contact.css";
import "styles/MiniCalendar.css";
import "styles/index.css";
import { Metadata } from "next";
import { ViewportLayout } from "next/dist/lib/metadata/types/extra-types";

export const metadata: Metadata = {
  title: "My Investment Diary",
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

// ClientLayout을 동적으로 임포트하여 클라이언트 측 컴포넌트로 처리 (SSR 비활성화)
const ClientLayout = dynamic(() => import("./ClientLayout"), {
  ssr: false,
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body id="root">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
