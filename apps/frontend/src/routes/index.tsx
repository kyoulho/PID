import React, { ReactNode } from "react";
import {
  MdAccountBalance,
  MdBarChart,
  MdDashboard,
  MdOutlineShoppingCart,
  MdPerson,
} from "react-icons/md";

export type RouteType = {
  name: string;
  layout: string;
  path: string;
  icon: ReactNode;
  userOnly: boolean;
};

export const UserRoute: RouteType[] = [
  {
    name: "대시보드",
    layout: "/user",
    path: "/dashboard",
    icon: <MdDashboard className="h-6 w-6" />,
    userOnly: false,
  },
  {
    name: "계좌 관리",
    layout: "/user",
    path: "/account",
    icon: <MdAccountBalance className="h-6 w-6" />,
    userOnly: false,
  },
  {
    name: "NFT Marketplace",
    layout: "/user",
    path: "/nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    userOnly: false,
  },
  {
    name: "Data Tables",
    layout: "/user",
    path: "/data-tables",
    icon: <MdBarChart className="h-6 w-6" />,
    userOnly: false,
  },
  {
    name: "Profile",
    layout: "/user",
    path: "/profile",
    icon: <MdPerson className="h-6 w-6" />,
    userOnly: false,
  },
];
