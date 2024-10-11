"use client";

import React, { ReactNode, FC, PropsWithChildren } from "react";

import dynamic from "next/dynamic";

interface NoSSRProps {
  children: ReactNode;
}

const _NoSSR: FC<NoSSRProps> = ({ children }) => <>{children}</>;

// NoSSR 컴포넌트를 동적으로 임포트하여 SSR 비활성화
const NoSSR = dynamic<NoSSRProps>(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

const AppWrappers: FC<PropsWithChildren> = ({ children }) => {
  return <NoSSR>{children}</NoSSR>;
};

export default AppWrappers;
