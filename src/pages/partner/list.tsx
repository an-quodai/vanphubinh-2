import { Page } from "src/components/page";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
import { HttpError, useList } from "@refinedev/core";
import { Partner } from "src/utils/interface";

export const PartnerList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { data, isLoading, isRefetching } = useList<Partner, HttpError>({
    resource: "partners",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const items = data?.data ?? [];
  const total = data?.meta?.total;

  const columns = useMemo<MRT_ColumnDef<Partner>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Tên",
      },
      {
        accessorKey: "phone",
        header: "Số điện thoại",
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
      },
    ],
    []
  );

  return (
    <Page title="Đối tác">
      <Table
        columns={columns}
        data={items}
        manualPagination
        rowCount={total}
        state={{
          pagination,
          isLoading: isRefetching || isLoading,
        }}
        onPaginationChange={setPagination}
      />
    </Page>
  );
};
