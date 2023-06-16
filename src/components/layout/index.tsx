import { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Menu } from "../menu";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div className="layout">
      <AppShell
        padding="0px"
        styles={{
          root: {
            header: {
              background: "#25282f",
              borderBottomColor: "#25282f",
              boxShadow:
                "0 0.7px 1.4px rgba(0,0,0,.07), 0 1.9px 4px rgba(0,0,0,.05), 0 4.5px 10px rgba(0,0,0,.05)",
            },
            nav: {
              background: "rgb(247, 248, 252)",
            },
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 250 }}
          >
            <Menu />
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 50 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            </div>
          </Header>
        }
      >
        {/* <Breadcrumb /> */}
        {children}
      </AppShell>
    </div>
  );
};
