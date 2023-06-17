import { Stack, Box, Title, Flex, Button, Paper } from "@mantine/core";
import { Breadcrumb } from "../breadcrumb";

type Props = {
  children: React.ReactNode;
  createButtonProps?: React.ComponentProps<typeof Button>;
  withPadding?: boolean;
};

export const Page: React.FC<Props> = ({
  children,
  createButtonProps,
  withPadding,
}) => {
  return (
    <Stack
      mah="inherit"
      sx={{
        overflow: "hidden",
        height: "100%",
        padding: "1rem",
        borderRadius: "0.75rem",
      }}
    >
      <Flex justify="space-between">
        <Title order={2}>Temporaty title</Title>
        <Button {...createButtonProps}>Tạo hàng hoá</Button>
      </Flex>
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
          padding: withPadding ? "0 1rem" : "0",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
