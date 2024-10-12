"use client";

import type { FC } from "react";
import ColumnsTable from "components/tables/ColumnsTable";
import tableDataColumns from "../../variables/data-tables/tableDataColumns";

const Account: FC = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ColumnsTable tableData={tableDataColumns} />
      </div>
    </div>
  );
};

export default Account;
