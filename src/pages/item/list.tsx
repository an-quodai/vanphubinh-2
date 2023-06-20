import { Page } from "src/components/page";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Table } from "src/components/table";
// import { NewItemForm } from "src/components/item";
import { Item } from "src/utils/interface";
import { HttpError, useList } from "@refinedev/core";

export const ItemList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { data, isLoading, isRefetching } = useList<Item, HttpError>({
    resource: "items",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const items = data?.data ?? [];
  const total = data?.meta?.total;

  const columns = useMemo<MRT_ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Tên",
        size: 300,
      },
      {
        accessorKey: "uom.name",
        header: "Đơn vị",
      },
      {
        accessorKey: "price", //normal accessorKey
        header: "Giá mua",
      },
      {
        accessorKey: "cost",
        header: "Giá bán",
      },
      {
        accessorKey: "purchaseUom.name",
        header: "Đơn vị mua hàng",
      },
    ],
    []
  );
  // const openNewItemModal = () => {
  //   openModal({
  //     title: "Hàng hoá mới",
  //     centered: true,
  //     children: <NewItemForm />,
  //   });
  // };

  return (
    <Page title="Hàng hoá">
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
