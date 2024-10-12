// src/pages/AccountPage.tsx
"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import { GetAccountDTO } from "@mid/shared";
import AccountColumnDefs from "components/tables/AccountColumnDefs";
import axiosInstance from "utils/axiosInstance";

const AccountPage: FC = () => {
  const [accounts, setAccounts] = useState<GetAccountDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      setError(false);
      try {
        const response =
          await axiosInstance.get<GetAccountDTO[]>("/api/accounts");
        setAccounts(response.data);
      } catch (err) {
        setError("계좌 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="mt-5 grid h-full grid-cols-1 gap-5">
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
