// src/columns/columns.tsx

import React from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { GetAccountDTO } from "@mid/shared"; // 올바른 경로로 수정

const columnHelper = createColumnHelper<GetAccountDTO>();

const AccountColumnDefs: ColumnDef<GetAccountDTO, string | number>[] = [
  columnHelper.accessor("issuer", {
    id: "issuer",
    header: () => (
      <p className="text-sm font-bold text-gray-600 dark:text-white">발행처</p>
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
      <p className="text-sm font-bold text-gray-600 dark:text-white">계좌명</p>
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
      <p className="text-sm font-bold text-gray-600 dark:text-white">
        계좌번호
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
      <p className="text-sm font-bold text-gray-600 dark:text-white">종류</p>
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
      <p className="text-sm font-bold text-gray-600 dark:text-white">금리</p>
    ),
    cell: (info) => (
      <p className="text-sm font-bold text-navy-700 dark:text-white">
        {info.getValue<number>()}
      </p>
    ),
  }),
];

export default AccountColumnDefs;
