import { FC, ReactNode } from "react";

export type SidebarProps = {
  children: ReactNode[];
};

export const Sidebar: FC<SidebarProps> = () => {
  return (
    <div className="bg-white shadow-lg h-full w-64 p-4 flex flex-col">
      <div className="text-center py-4">
        <h1 className="font-bold text-xl">ODD Shop</h1>
      </div>
      <ul className="flex-1">
        <li className="my-2">
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-lg">
            <span className="mr-2">📊</span>
            <span>전체 개요</span>
          </button>
        </li>
        <li className="my-2">
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-lg">
            <span className="mr-2">👥</span>
            <span>회원 관리</span>
          </button>
        </li>
        <li className="my-2">
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-lg">
            <span className="mr-2">💰</span>
            <span>결제 관리</span>
          </button>
        </li>
        <li className="my-2">
          <button className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded-lg">
            <span className="mr-2">👕</span>
            <span>상품 관리</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
