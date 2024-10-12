import React, { ReactNode } from "react";
import {
  MdAccountBalance,
  MdBarChart,
  MdDashboard,
  MdOutlineShoppingCart,
  MdPerson,
} from "react-icons/md";

export interface RouteType {
  path: string;
  name: string;
  icon: ReactNode;
  isAuth: boolean;
}

const routes: RouteType[] = [
  {
    name: "대시보드",
    path: "/dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    isAuth: true,
  },
  {
    name: "계좌 관리",
    path: "/account",
    icon: <MdAccountBalance className="h-6 w-6" />,
    isAuth: true,
  },
  {
    name: "NFT Marketplace",
    path: "/nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    isAuth: true,
  },
  {
    name: "Data Tables",
    path: "/data-tables",
    icon: <MdBarChart className="h-6 w-6" />,
    isAuth: true,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <MdPerson className="h-6 w-6" />,
    isAuth: true,
  },
];
export default routes;
