import { Box, Flex } from "@mantine/core";
import {
  MRT_GlobalFilterTextInput,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MantineReactTable,
  MantineReactTableProps,
} from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi";

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const Table = <TData extends Record<string, any> = {}>(
  props: MantineReactTableProps<TData>
) => {
  return (
    <MantineReactTable
      {...props}
      enableRowSelection
      localization={MRT_Localization_VI}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      mantineTopToolbarProps={{
        sx: {
          minHeight: "2.2rem",
        },
      }}
      initialState={{
        showGlobalFilter: true,
        ...props.initialState,
      }}
      mantineTableBodyCellProps={{
        sx: {
          border: "none",
        },
      }}
      mantinePaperProps={{
        withBorder: false,
        shadow: "none",
        width: "100%",
        sx: {
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
      mantineBottomToolbarProps={{
        sx: {
          minHeight: "2.5rem",
        },
      }}
      mantinePaginationProps={{
        showRowsPerPage: false,
      }}
      mantineTableContainerProps={{
        sx: {
          height: "100%",
          maxHeight: "calc(100vh - 12.3em)",
          flex: "1 1 auto",
          marginTop: "1rem",
          border: "1px solid #dddddd",
          borderRadius: "0.25rem",
        },
      }}
      mantineTableHeadRowProps={{
        sx: {
          backgroundColor: "#F1F3F5",
        },
      }}
      mantineTableHeadCellProps={{
        sx: {
          "& .mantine-TableHeadCell-Content": {
            justifyContent: "space-between",
            color: "black",
          },
        },
      }}
      mantineTableHeadProps={{
        sx: {},
      }}
      mantineTableProps={{
        sx: {
          border: "none",
        },
      }}
      mantineTableBodyRowProps={{
        sx: {
          border: "none",
        },
      }}
      mantineSearchTextInputProps={{
        variant: "default",
        placeholder: "Tìm kiếm",
      }}
      renderTopToolbar={({ table }) => (
        <Flex justify="space-between">
          <Box></Box>
          <Flex>
            {table.options.enableColumnFilters && (
              <MRT_ToggleFiltersButton table={table} />
            )}
            <MRT_ShowHideColumnsButton table={table} />
            <MRT_GlobalFilterTextInput table={table} />
          </Flex>
        </Flex>
      )}
      enableStickyHeader={true}
    />
  );
};
