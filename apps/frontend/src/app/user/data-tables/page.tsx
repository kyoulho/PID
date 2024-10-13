"use client";

import tableDataDevelopment from "variables/data-tables/tableDataDevelopment";
import tableDataCheck from "variables/data-tables/tableDataCheck";
import CheckTable from "components/tables/CheckTable";
import tableDataComplex from "variables/data-tables/tableDataComplex";
import DevelopmentTable from "components/tables/DevelopmentTable";
import ComplexTable from "components/tables/ComplexTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable tableData={tableDataDevelopment} />
        <CheckTable tableData={tableDataCheck} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        <ComplexTable tableData={tableDataComplex} />
      </div>
    </div>
  );
};

export default Tables;
