import type { FC, PropsWithChildren } from "react";
import React from "react";
import AppWrappers from "./AppWrappers";
import { Metadata, Viewport } from "next";
import { ClientLayout } from "./ClientLayout";

import "styles/App.css";
import "styles/Contact.css";
import "styles/MiniCalendar.css";
import "styles/index.css";

export const metadata: Metadata = {
  title: "My Investment Diary",
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`,
        type: "image/x-icon",
      },
    ],
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  themeColor: "#000000",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body id="root">
        <AppWrappers>
          <ClientLayout>{children}</ClientLayout>
        </AppWrappers>
      </body>
    </html>
  );
};

export default RootLayout;
