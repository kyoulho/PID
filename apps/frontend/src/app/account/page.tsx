"use client";

import type { FC } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import { GetAccountDTO } from "@mid/shared";
import AccountColumnDefs from "components/tables/AccountColumnDefs";
import { useEffect, useState } from "react";

const getAccountDTOs = async (): Promise<GetAccountDTO[]> => {
  return [
    {
      name: "My Savings Account",
      description: "This is my primary savings account.",
      issuer: "Bank of Korea",
      number: "1234567890",
      interestRate: 1.5,
      withdrawalLimit: 10000,
      id: "a1b2c3d4-e5f6-7890-1234-56789abcdef0",
      accountTypeName: "Savings",
      createdAt: "2023-10-06T12:34:56.789Z",
    },
  ];
};

const AccountPage: FC = () => {
  const [accounts, setAccounts] = useState<GetAccountDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accountData = await getAccountDTOs();
      setAccounts(accountData);
    };

    fetchData();
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
