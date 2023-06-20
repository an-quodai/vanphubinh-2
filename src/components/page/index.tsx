import { Stack, Box, Title, Flex, Button, Paper } from "@mantine/core";
import { Breadcrumb } from "../breadcrumb";

type Props = {
  children: React.ReactNode;
  createButtonProps?: React.ComponentProps<typeof Button>;
  title: string;
};

export const Page: React.FC<Props> = ({
  children,
  createButtonProps,
  title = "Resource",
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
        <Title order={2}>{title}</Title>
        <Button {...createButtonProps}>Tạo {title.toLocaleLowerCase()}</Button>
      </Flex>
      <Box
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
