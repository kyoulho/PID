"use client";

import type { FC } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import { GetAccountDTO } from "@mid/shared";
import AccountColumnDefs from "components/tables/AccountColumnDefs";
import { useEffect, useState } from "react";

const BACKEND_BASE_URL = "http://localhost:8080";

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

const Account: FC = () => {
  const [data, setData] = useState<GetAccountDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountData = await getAccountDTOs();
        setData(accountData);
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ColumnsTable
          tableName={"table"}
          tableData={data}
          columnDefs={AccountColumnDefs}
        />
      </div>
    </div>
  );
};

export default Account;
