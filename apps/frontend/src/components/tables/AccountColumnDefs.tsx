// src/columns/columns.tsx

import React from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { GetAccountDTO } from "@mid/shared";

const columnHelper = createColumnHelper<GetAccountDTO>();

const AccountColumnDefs: ColumnDef<GetAccountDTO, string | number>[] = [
  columnHelper.accessor("issuer", {
    id: "issuer",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">발행처</p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<string>()}
      </p>
    ),
  }),

  columnHelper.accessor("name", {
    id: "name",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">계좌명</p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<string>()}
      </p>
    ),
  }),
  columnHelper.accessor("number", {
    id: "number",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">
        계좌 번호
      </p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<string>()}
      </p>
    ),
  }),
  columnHelper.accessor("accountTypeName", {
    id: "accountTypeName",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">종류</p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<string>()}
      </p>
    ),
  }),
  columnHelper.accessor("interestRate", {
    id: "interestRate",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">
        이자율(%)
      </p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<number>()}
      </p>
    ),
  }),
  columnHelper.accessor("withdrawalLimit", {
    id: "withdrawalLimit",
    header: () => (
      <p className="text-sm font-bold text-gray-700 dark:text-white">
        출금 한도(원)
      </p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<string>().toLocaleString("ko-KR")}
      </p>
    ),
  }),
];

export default AccountColumnDefs;
