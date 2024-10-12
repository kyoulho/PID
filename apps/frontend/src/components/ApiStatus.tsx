// src/components/ApiStatus.tsx
"use client";

import React from "react";
import useApiStore from "../store/useApiStore";

const ApiStatus: React.FC = () => {
  const { loading, error } = useApiStore();

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bg-blue-500 text-white text-center p-2 z-50">
          로딩 중...
        </div>
      )}
      {error && (
        <div className="fixed top-16 left-0 right-0 bg-red-500 text-white text-center p-2 z-50">
          {error}
        </div>
      )}
    </>
  );
};

export default ApiStatus;
