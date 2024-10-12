"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import { GetAccountDTO } from "@mid/shared";
import AccountColumnDefs from "components/tables/AccountColumnDefs";
import api from "utils/api";

const AccountPage: FC = () => {
  const [accounts, setAccounts] = useState<GetAccountDTO[]>([]);

  useEffect(() => {
    const getAccount = async () => {
      return await api("/api/accounts", { method: "GET" });
    };
    const account = getAccount();
    setAccounts(account);
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ColumnsTable
          tableName={"계좌 목록"}
          tableData={accounts}
          columnDefs={AccountColumnDefs}
        />
      </div>
    </div>
  );
};

export default AccountPage;
