import { Page } from "src/components/page";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
import { HttpError, useList } from "@refinedev/core";
import { SaleOrder } from "src/utils/interface";

export const SaleOrderList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { data, isLoading, isRefetching } = useList<SaleOrder, HttpError>({
    resource: "sale-orders",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const items = data?.data ?? [];
  const total = data?.meta?.total;

  const columns = useMemo<MRT_ColumnDef<SaleOrder>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Mã đơn hàng",
      },
      {
        accessorKey: "customer.name",
        header: "Khách hàng",
      },
    ],
    []
  );

  return (
    <Page title="Đơn bán hàng">
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
