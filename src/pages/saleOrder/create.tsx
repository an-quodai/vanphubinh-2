import { useForm } from "@refinedev/mantine";
import { Page } from "src/components/page";
import { PartnerSelect } from "src/components/partner";
import { randomId } from "@mantine/hooks";
import {
  ActionIcon,
  Paper,
  Button,
  Group,
  Indicator,
  NumberInput,
  Select,
  Space,
  Table,
  Text,
  Textarea,
  Grid,
  Container,
  Box,
  Badge,
} from "@mantine/core";
import { IconTrash, IconCopy } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/vi";
import { useCreate, useSelect } from "@refinedev/core";
import { Item } from "src/utils/interface";
import { Tabs } from "@mantine/core";
import { Divider } from "@mantine/core";

export const SaleOrderCreate = () => {
  const { options, queryResult } = useSelect<Item>({
    resource: "items",
    optionLabel: "name",
    optionValue: "id",
    debounce: 500,
  });
  const { mutate, isLoading } = useCreate();

  const {
    saveButtonProps,
    getInputProps,
    values,
    removeListItem,
    insertListItem,
    setFieldValue,
  } = useForm({
    initialValues: {
      customerId: "",
      saleOrderLines: [
        {
          itemId: 0,
          quantity: 0,
          unitPrice: 0,
          deliveryDate: null,
          note: "",
          key: randomId(),
        },
      ],
    },
  });

  const saleLineFields = values.saleOrderLines?.map((saleLine, index) => (
    <tr key={saleLine.key}>
      <td>{index + 1}</td>
      <td>
        <Select
          required
          sx={{ marginTop: "0 !important" }}
          onCreate={(query) => {
            mutate(
              {
                resource: "items",
                values: {
                  name: query,
                },
                meta: {
                  select: "id, name",
                },
              },
              {
                onSuccess(data) {
                  const newItem = data?.data;
                  const item = { value: newItem?.id, label: newItem?.name };
                  setFieldValue(`saleOrderLines.${index}.itemId`, item.value);
                },
              }
            );
            return "25";
          }}
          mt={8}
          data={options}
          searchable
          filterDataOnExactSearchMatch
          clearable
          nothingFound="Không tìm thấy sản phẩm"
          variant="unstyled"
          placeholder="Nhãn nước suối 0.5L"
          creatable
          getCreateLabel={(query) => `+ Thêm ${query}`}
          {...getInputProps(`saleOrderLines.${index}.itemId`)}
        />
      </td>
      <td>
        <Text>
          {
            queryResult.data?.data.find(
              (record) => record?.id == values.saleOrderLines[index].itemId
            )?.uom.name
          }
        </Text>
      </td>
      <td style={{ width: "10%" }}>
        <NumberInput
          sx={{ flex: 1 }}
          variant="unstyled"
          parser={(value) => value.replace(/\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
          {...getInputProps(`saleOrderLines.${index}.quantity`)}
        />
      </td>
      <td style={{ width: "10%" }}>
        <NumberInput
          sx={{ flex: 1 }}
          variant="unstyled"
          parser={(value) => value.replace(/\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
          {...getInputProps(`saleOrderLines.${index}.unitPrice`)}
        />
      </td>
      <td style={{ width: "10%" }}>
        <NumberInput
          variant="unstyled"
          value={
            values.saleOrderLines[index].quantity *
            values.saleOrderLines[index].unitPrice
          }
          parser={(value) => value.replace(/\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
        />
      </td>
      <td>
        <DatePickerInput
          sx={{
            button: {
              padding: "0",
            },
          }}
          variant="unstyled"
          dropdownType="popover"
          valueFormat="DD/MM/YYYY"
          placeholder="Chọn ngày giao hàng"
          renderDay={(date) => {
            const day = date.getDate();
            const today = new Date().getDate();
            return (
              <Indicator
                size={6}
                color="red"
                offset={-2}
                disabled={day !== today}
              >
                {day}
              </Indicator>
            );
          }}
          withAsterisk
          {...getInputProps(`saleOrderLines.${index}.deliveryDate`)}
        />
      </td>
      <td style={{ width: "25%" }}>
        <Textarea variant="unstyled" size="xs" autosize p={0} />
      </td>
      <td>
        <Group spacing="0">
          <ActionIcon>
            <IconCopy size="1rem" />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => removeListItem("saleOrderLines", index)}
          >
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Page createButtonProps={saveButtonProps}>
      <form>
        <PartnerSelect {...getInputProps("customerId")} />
        <Space h="md" />
        <Paper>
          <Tabs defaultValue="sale-order-lines">
            <Tabs.List>
              <Tabs.Tab
                value="sale-order-lines"
                icon={<Badge>{values.saleOrderLines?.length}</Badge>}
              >
                Bán hàng
              </Tabs.Tab>
              <Tabs.Tab
                value="repair-order-lines"
                icon={<Badge>{values.saleOrderLines?.length}</Badge>}
              >
                Sửa trục
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="sale-order-lines" pt="xs">
              <Paper sx={{ overflow: "auto", height: "45vh" }} withBorder>
                <Table
                  sx={{
                    border: "none",
                    thead: {
                      top: -1,
                      zIndex: 999,
                      position: "sticky",
                      background: "white",
                      tr: {
                        th: {
                          zIndex: 1,
                          // paddingTop: "0.25rem",
                          // paddingBottom: "0.25rem",
                        },
                        backgroundColor: "#f1f3f5",
                      },
                    },
                    tbody: {
                      tr: {
                        td: {
                          borderBottom: "none",
                          // paddingTop: "0rem",
                          // paddingBottom: "0rem",
                        },
                      },
                    },
                  }}
                >
                  <thead>
                    <tr style={{ boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)" }}>
                      <th>#</th>
                      <th>Sản phẩm</th>
                      <th>Đơn vị</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                      <th>Ngày giao hàng</th>

                      <th>Ghi chú</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{saleLineFields}</tbody>
                </Table>
              </Paper>
              <Button
                variant="subtle"
                compact
                size="xs"
                color="gray"
                onClick={() => {
                  insertListItem("saleOrderLines", {
                    itemId: 0,
                    quantity: 0,
                    unitPrice: 0,
                    note: "",
                    key: randomId(),
                  });
                }}
              >
                + Thêm dòng
              </Button>
            </Tabs.Panel>

            <Tabs.Panel value="repair-order-lines" pt="xs">
              <Paper sx={{ overflow: "auto", height: "45vh" }} withBorder>
                <Table
                  sx={{
                    border: "none",
                    thead: {
                      top: -1,
                      zIndex: 999,
                      position: "sticky",
                      background: "white",
                      tr: {
                        th: {
                          zIndex: 1,
                          // padding: "0.75rem",
                        },
                        backgroundColor: "#f1f3f5",
                      },
                    },
                    tbody: {
                      tr: {
                        td: {
                          borderBottom: "none",
                        },
                      },
                    },
                  }}
                >
                  <thead>
                    <tr style={{ boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)" }}>
                      <th>#</th>
                      <th>Sản phẩm</th>
                      <th>Đơn vị</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                      <th>Ngày giao hàng</th>

                      <th>Ghi chú</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{saleLineFields}</tbody>
                </Table>
              </Paper>
              <Button
                variant="subtle"
                compact
                size="xs"
                color="gray"
                onClick={() => {
                  insertListItem("saleOrderLines", {
                    itemId: 0,
                    quantity: 0,
                    unitPrice: 0,
                    note: "",
                    key: randomId(),
                  });
                }}
              >
                + Thêm dòng
              </Button>
            </Tabs.Panel>
          </Tabs>
        </Paper>
        <Table>
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>
                <Text fw={700}>Giá trị trước thuế:</Text>
              </td>
              <td style={{ width: "10%", textAlign: "right" }}>500.000</td>
            </tr>
          </tbody>
        </Table>
      </form>
    </Page>
  );
};
