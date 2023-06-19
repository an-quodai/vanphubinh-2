import { Page } from "src/components/page";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { Center, Loader } from "@mantine/core";
import { Table } from "src/components/table";
// import { NewItemForm } from "src/components/item";
import { HttpError, useList } from "@refinedev/core";

interface IItem {
  name: string;
  uom: {
    name: string;
  };
  price: number;
  cost: number;
  purchase_uom: {
    name: string;
  };
}

export const ItemList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });
  const { data, isLoading, isRefetching } = useList<IItem, HttpError>({
    resource: "items",
    pagination: {
      current: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    },
  });
  const items = data?.data ?? [];
  const total = data?.meta?.total;

  const columns = useMemo<MRT_ColumnDef[]>(
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
    <Page
      createButtonProps={{
        // onClick: openNewItemModal,
        disabled: isLoading || isRefetching,
      }}
    >
      {(isLoading || isRefetching) && (
        <Center h="100%">
          <Loader />
        </Center>
      )}
      {!isLoading && !isRefetching && (
        <Table
          columns={columns}
          data={items}
          manualPagination
          rowCount={total}
          state={{
            pagination,
          }}
          onPaginationChange={setPagination}
        />
      )}
    </Page>
  );
};
