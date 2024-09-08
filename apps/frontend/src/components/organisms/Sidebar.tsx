"use client";

import NavItem from "@/components/atoms/NavItem";
import NavGroup from "@/components/molecules/NavGroup";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { FC } from "react";
import { usePathname } from "next/navigation";

export const Sidebar: FC = () => {
  const currentPath = usePathname(); // 현재 경로를 가져오는 새로운 방식

  return (
    <nav className="w-64 bg-gray-100 h-full p-4">
      <div className="flex items-center justify-between p-4 bg-gray-200 rounded-lg mb-4">
        <div className="flex items-center">
          <img
            src="/path-to-avatar"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-semibold">김성우</p>
            <p className="text-sm text-gray-600">관리자</p>
          </div>
        </div>
        <div>...</div>
      </div>

      <ul>
        <NavItem label="홈" href="/" active={currentPath === "/"} />
        <NavGroup
          label="계좌 관리"
          icon={<ManageAccountsIcon />}
          items={[
            { label: "전체 계좌", href: "/accounts/all" },
            { label: "계좌 추가", href: "/accounts/add" },
          ]}
        />
        <NavItem
          label="결제 관리"
          href="/payments"
          active={currentPath === "/payments"}
        />
        <NavItem
          label="상품 관리"
          href="/products"
          active={currentPath === "/products"}
        />
      </ul>
    </nav>
  );
};
