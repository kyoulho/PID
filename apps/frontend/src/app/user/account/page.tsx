// src/pages/AccountPage.tsx
"use client";

import type { FC } from "react";
import { useEffect } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import AccountColumnDefs from "components/tables/AccountColumnDefs";
import useAccountStore from "store/useAccountStore";

const AccountPage: FC = () => {
  const { accounts, loading, error, fetchAccounts } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="m-5 grid h-full grid-cols-1 gap-5">
      <ColumnsTable
        tableName="계좌 목록"
        tableData={accounts}
        columnDefs={AccountColumnDefs}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AccountPage;
