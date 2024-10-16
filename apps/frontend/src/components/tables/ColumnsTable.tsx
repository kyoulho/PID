import React, { FC, useState } from "react";
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import { Spinner } from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// Props 타입을 제네릭으로 정의하여 유연성 및 타입 안전성 향상
export type ColumnsTableProps<TData> = {
  tableName?: string;
  columnDefs: ColumnDef<TData>[];
  tableData: TData[];
  loading: boolean;
  error: boolean;
};

// 로딩 상태를 위한 컴포넌트
const LoadingRow: FC<{ colSpan: number }> = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-4 text-center">
      <div className="flex justify-center items-center">
        <Spinner speed="1s" />
      </div>
    </td>
  </tr>
);

// 에러 메시지를 위한 컴포넌트
const ErrorRow: FC<{ colSpan: number }> = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="min-w-[150px] py-3 pr-4 text-center">
      <p className="text-sm font-bold text-gray-700 dark:text-white">
        데이터를 불러오는데 실패했습니다.
      </p>
    </td>
  </tr>
);

// 빈 데이터를 위한 컴포넌트
const EmptyRow: FC<{ colSpan: number }> = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan} className="min-w-[150px] py-3 pr-4 text-center">
      <p className="text-sm font-bold text-gray-700 dark:text-white">
        데이터가 없습니다.
      </p>
    </td>
  </tr>
);

// 데이터 행을 위한 컴포넌트
const DataRows: FC<{
  rows: unknown[];
}> = ({ rows }) => (
  <>
    {rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} className="min-w-[150px] py-3 pr-4 text-start">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </>
);

const ColumnsTable: FC<ColumnsTableProps<unknown>> = ({
  tableName = "테이블",
  columnDefs,
  tableData,
  loading,
  error,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // React Table 설정
  const table = useReactTable({
    data: tableData,
    columns: columnDefs,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // 공통 colSpan 계산
  const colSpan = columnDefs.length;

  return (
    <Card extra="w-full h-full p-6 sm:overflow-x-auto">
      {/* 헤더 섹션 */}
      <div className="relative flex items-center justify-between">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
          {tableName}
        </h2>
        <CardMenu />
      </div>

      {/* 테이블 섹션 */}
      <div className="mt-4 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          {/* 테이블 헤더 */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                  >
                    <div className="flex items-center justify-center text-xs text-gray-600">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* 정렬 아이콘 */}
                      <span className="w-4 text-right">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? (
                          <span className="">↕️</span>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* 테이블 바디 */}
          <tbody>
            {loading ? (
              <LoadingRow colSpan={colSpan} />
            ) : error ? (
              <ErrorRow colSpan={colSpan} />
            ) : tableData.length > 0 ? (
              <DataRows rows={tableData} />
            ) : (
              <EmptyRow colSpan={colSpan} />
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
